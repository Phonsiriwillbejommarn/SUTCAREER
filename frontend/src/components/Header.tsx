import React from "react";
import { Layout, Menu, Button, Avatar, Badge, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const profileMenu = (
  <Menu>
    <Menu.Item key="1" icon={<UserOutlined />}>
      <Link to="/profile">ข้อมูลส่วนตัว</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<SettingOutlined />}>
      <Link to="/settings">ตั้งค่า</Link>
    </Menu.Item>
    <Menu.Item key="3" icon={<PlusOutlined />}>
      <Link to="/qa">Q&A</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="4" icon={<LogoutOutlined />}>
      ออกจากระบบ
    </Menu.Item>
  </Menu>
);

const AppHeader = ({ username = "Profile", logoSize = "200px" }) => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "0 24px",
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
        height: "64px",
        lineHeight: "64px",
        overflow: "visible",
      }}
    >
      <div
        className="logo"
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "auto",
          lineHeight: 0,
          position: "relative",
          top: "16px",
        }}
      >
        <Link to="/" style={{ display: "inline-flex", alignItems: "center" }}>
          <img
            src="/Logo.svg"
            alt="SUT Career Logo"
            style={{
              height: logoSize,
              display: "block",
            }}
          />
        </Link>
      </div>

      <Space align="center" size="large" style={{ lineHeight: 1 }}>
        <Link to="/create">
          <Button type="primary" icon={<PlusOutlined />}>
            โพสต์
          </Button>
        </Link>

        <Badge count={5}>
          <Button
            type="text"
            shape="circle"
            icon={<BellOutlined style={{ fontSize: "20px" }} />}
          />
        </Badge>

        <Dropdown
          overlay={profileMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Space style={{ cursor: "pointer" }}>
            <Avatar icon={<UserOutlined />} />
            <span style={{ lineHeight: 1 }}>{username}</span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AppHeader;