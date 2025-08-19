import { Row, Col, Typography } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import type { Question } from '../../types';

const { Title } = Typography;

interface FAQPageProps {
  questions: Question[];
  onLike: (id: number) => void;
}

const FAQPage: React.FC<FAQPageProps> = ({ questions, onLike }) => {
  return (
    <div className="site-layout-content" style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        คำถามที่พบบ่อย
      </Title>
      <Row gutter={[16, 16]}>
        {questions.map((q) => (
          <Col xs={24} sm={12} md={8} key={q.id}>
            <QuestionCard question={q} onLike={onLike} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FAQPage;
