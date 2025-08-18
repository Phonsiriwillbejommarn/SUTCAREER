import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiHeart, FiMessageSquare, FiMoreHorizontal, FiBookmark } from 'react-icons/fi';

// ตรวจสอบให้แน่ใจว่ามีการ export interface นี้
export interface Post {
  id: number;
  author: string;
  content: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <FaUserCircle size={40} className="user-avatar" />
        <div className="post-author-info">
          <span className="user-name">{post.author}</span>
          <span className="post-tag">งานพาร์ทไทม์</span>
        </div>
        <div className="post-actions">
          <FiBookmark size={20} />
          <FiMoreHorizontal size={20} />
        </div>
      </div>
      <p className="post-content">{post.content}</p>
      <div className="post-footer">
        <FiHeart size={20} />
        <FiMessageSquare size={20} />
      </div>
    </div>
  );
};

export default PostCard;
