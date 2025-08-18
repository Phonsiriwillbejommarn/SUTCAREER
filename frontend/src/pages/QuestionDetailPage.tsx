import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  List,
  Avatar,
  Input,
  Button,
  Divider,
  Tag,
  Result,
  Descriptions,
  Card as AntCard,
  message,
} from 'antd';
import { UserOutlined, PaperClipOutlined, SendOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { Question } from '../types';

const { Title, Paragraph } = Typography;

interface QuestionDetailPageProps {
  questions: Question[];
  onAddAnswer: (questionId: number, answerText: string, author?: string) => void;
}

const QuestionDetailPage: React.FC<QuestionDetailPageProps> = ({ questions, onAddAnswer }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = questions.find((q) => q.id === Number(id));
  const [inputValue, setInputValue] = useState('');

  if (!question) {
    return <Result status="404" title="404" subTitle="ขออภัย, ไม่พบคำร้องที่คุณค้นหา" />;
  }

  const staffReplies = question.answers.filter((a) => a.isStaff && a.author !== 'ระบบ');
  const isPending = staffReplies.length === 0;

  if (isPending) {
    const userSubmission = question.answers.find((a) => !a.isStaff);
    return (
      <AntCard>
        <Result
          icon={<ClockCircleOutlined />}
          title="กำลังรอการตรวจสอบ"
          subTitle="คำร้องของคุณถูกส่งเข้าระบบเรียบร้อยแล้ว เจ้าหน้าที่จะดำเนินการตรวจสอบและตอบกลับโดยเร็วที่สุด"
          extra={[
            <Button type="primary" key="console" onClick={() => navigate('/')}>
              กลับไปหน้าหลัก
            </Button>,
          ]}
        >
          <div className="desc-container">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="หัวข้อเรื่อง">{question.title}</Descriptions.Item>
              <Descriptions.Item label="ผู้ส่งคำร้อง">{question.author}</Descriptions.Item>
              <Descriptions.Item label="รายละเอียด">
                <Paragraph style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{userSubmission?.text}</Paragraph>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Result>
      </AntCard>
    );
}

  const handleSend = () => {
    if (!inputValue.trim()) {
      message.warn('กรุณาพิมพ์ข้อความก่อนส่ง');
      return;
    }
    onAddAnswer(question.id, inputValue.trim(), 'ผู้ใช้งาน');
    setInputValue('');
  };

  return (
    <div className="chat-container">
      <Title level={3} style={{ textAlign: 'center' }}>
        {question.title}
      </Title>
      <Divider />
      <List
        dataSource={question.answers.filter((a) => a.author !== 'ระบบ')}
        renderItem={(item) => (
          <List.Item className={!item.isStaff ? 'chat-bubble-right' : 'chat-bubble-left'}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <>
                  {item.author}
                  {item.isStaff && (
                    <Tag color="processing" style={{ marginLeft: 8 }}>
                      เจ้าหน้าที่
                    </Tag>
                  )}
                </>
              }
              description={<div style={{ whiteSpace: 'pre-wrap' }}>{item.text}</div>}
            />
          </List.Item>
        )}
      />
      <div className="chat-input-container">
        <Avatar icon={<UserOutlined />} size="large" />
        <Input.TextArea
          placeholder="พิมพ์ข้อความที่นี่..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button shape="circle" icon={<PaperClipOutlined />} size="large" />
        <Button type="primary" shape="circle" icon={<SendOutlined />} size="large" onClick={handleSend} />
      </div>
    </div>
  );
};

export default QuestionDetailPage;
