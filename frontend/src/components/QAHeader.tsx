import React from 'react';
import { Layout, Menu, Button, Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { FormOutlined, FileAddOutlined, FileTextOutlined, FileDoneOutlined } from '@ant-design/icons';


const { Header } = Layout;

// กำหนด type ให้กับ props
interface QAHeaderProps {
  newQuestionId: number | undefined;
}

// รับ newQuestionId เข้ามาใน props
const QAHeader: React.FC<QAHeaderProps> = ({ newQuestionId }) => {
  // กำหนด URL ของลิงก์ "คำร้องของฉัน"
  const myRequestsLink = newQuestionId ? `/qa/question/${newQuestionId}` : '/qa';

  // กำหนดรายการเมนูสำหรับ Dropdown
  const requestMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/qa/ask">ส่งคำร้อง</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={myRequestsLink}>คำร้องของฉัน</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '0 24px', boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)' }}>
      <div className="logo" style={{ marginRight: 'auto' }}>
        <Link to="/qa">
        <img
  src="/Logo.svg"
  alt="Logo"
  style={{ height: '200px', position: 'relative', top: '19px', display: 'block' }}
/>

        </Link>
      </div>
      <Menu theme="light" mode="horizontal" style={{ flex: 1, justifyContent: 'flex-end', borderBottom: 'none' }}>
        <Menu.Item key="home">
          <Link to="/">
            <Button type="primary">
              หน้าหลัก
            </Button>
          </Link>
        </Menu.Item>

        

        <Menu.Item key="requests" style={{ padding: 0 }}>
          <Dropdown overlay={requestMenu} trigger={['click']} placement="bottomRight">
            <Button type="primary" icon={<FormOutlined />}>
              <Space>
                คำร้อง
              </Space>
            </Button>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default QAHeader;