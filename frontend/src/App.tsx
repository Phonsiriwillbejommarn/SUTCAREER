import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import QAHeader from './components/QAHeader';
import PostCreator from './components/PostCreator';
import FeedPage from './components/FeedPage';
import type { Post } from './components/PostCard';
import './index.css';

import FAQPage from './pages/FAQPage';
import AskQuestionPage from './pages/AskQuestionPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import type { Question, Answer } from './types';

function App() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, author: 'จอมมาร', content: 'หางาน Part-time ครับ อายุ 18-19' },
    { id: 2, author: 'จอมมาร2', content: 'หาคนขับรถได้ มีใบขับขี่' }
  ]);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: 'ประกาศงานวันนี้หมดอายุหรือไม่?',
      author: 'จอนนี่',
      likes: 5,
      answerCount: 2,
      answers: [
        { id: 1, author: 'เจ้าหน้าที่', text: 'หมดอายุตอนเที่ยงคืนครับ', isStaff: true },
        { id: 2, author: 'สมชาย', text: 'ใช่ครับ, หมดอายุแล้ว', isStaff: false },
      ],
      isFAQ: true,
    },
    { id: 2, title: 'พบปัญหางานใช้งานระบบควรทำอย่างไร?', author: 'สมศรี', likes: 12, answerCount: 4, answers: [], isFAQ: true },
    { id: 3, title: 'ระบบปลอดภัยในการเก็บข้อมูลหรือไม่?', author: 'วิชัย', likes: 8, answerCount: 0, answers: [], isFAQ: true },
  ]);

  const [newQuestion, setNewQuestion] = useState<Question | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddPost = (content: string) => {
    const newPost: Post = {
      id: Date.now(),
      author: 'จอมมาร',
      content: content,
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
    navigate('/');
  };

  const handleAddQuestion = (values: any) => {
    const createdAt = Date.now();
    const newQ: Question = {
      id: createdAt,
      title: values.title,
      author: values.name,
      likes: 0,
      answerCount: 1,
      answers: [
        {
          id: createdAt,
          author: values.name,
          text: `รายละเอียดที่ส่ง:\n- เบอร์โทร: ${values.phone}\n- อีเมล: ${values.email}\n- ติดต่อในนาม: ${values.contact_type}\n\n${values.details}`,
          isStaff: false,
        },
        {
          id: createdAt + 1,
          author: 'ระบบ',
          text: 'ได้รับคำร้องของคุณแล้ว',
          isStaff: true,
        },
      ],
      isFAQ: false,
    };

    setQuestions(prev => [newQ, ...prev]);
    setNewQuestion(newQ); // เก็บคำถามล่าสุดไว้
    navigate(`/qa/question/${newQ.id}`);
  };

  const handleLikeQuestion = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, likes: q.likes + 1 } : q))
    );
    if (newQuestion && newQuestion.id === id) {
      setNewQuestion((prev) =>
        prev
          ? {
              ...prev,
              likes: prev.likes + 1,
            }
          : null
      );
    }
  };

  const handleAddAnswer = (questionId: number, answerText: string, author = 'ผู้ใช้งาน') => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const newAnswer: Answer = {
            id: Date.now(),
            author,
            text: answerText,
            isStaff: false,
          };
          return {
            ...q,
            answers: [...q.answers, newAnswer],
            answerCount: q.answerCount + 1,
          };
        }
        return q;
      })
    );

    if (newQuestion && newQuestion.id === questionId) {
      const newAnswer: Answer = {
        id: Date.now(),
        author,
        text: answerText,
        isStaff: false,
      };
      setNewQuestion((prev) =>
        prev
          ? {
              ...prev,
              answers: [...prev.answers, newAnswer],
              answerCount: prev.answerCount + 1,
            }
          : null
      );
    }
  };

  const isQASection = location.pathname.startsWith('/qa');
  const currentUser = 'จอมมาร'; 
  const myQuestions = questions.filter(q => !q.isFAQ && q.author === currentUser);
  const faqQuestions = questions.filter(q => q.isFAQ);

  return (
    <div>
      {/* ส่ง newQuestionId ไปให้ QAHeader */}
      {isQASection ? <QAHeader newQuestionId={newQuestion?.id} /> : <Header />}
      <Routes>
        <Route path="/" element={<FeedPage posts={posts} />} />
        <Route path="/create" element={<PostCreator onAddPost={handleAddPost} />} />
        <Route 
          path="/qa" 
          element={<FAQPage questions={faqQuestions} myQuestions={myQuestions} onLike={handleLikeQuestion} />} 
        />
        <Route path="/qa/ask" element={<AskQuestionPage onFormSubmit={handleAddQuestion} />} />
        <Route
          path="/qa/question/:id"
          element={
            <QuestionDetailPage
              questions={questions}
              onAddAnswer={handleAddAnswer}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;