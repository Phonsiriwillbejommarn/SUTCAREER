import React, { useState } from 'react';
import { FiPaperclip } from 'react-icons/fi';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

interface PostCreatorProps {
  onAddPost: (content: string) => void;
}

const PostCreator: React.FC<PostCreatorProps> = ({ onAddPost }) => {
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (content.trim()) {
      onAddPost(content);
      setContent('');
    }
  };

  return (
    <main className="post-creator-container">
      <div className="post-creator-card">
        <div className="user-info">
          <FaUserCircle size={40} className="user-avatar" />
          <span className="user-name">จอมมาร</span>
        </div>
        <textarea
          className="post-textarea"
          placeholder="คุณกำลังหางานอะไรอยู่..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="post-toolbar">
          <span>เพิ่มลงในโพสต์ของคุณ</span>
          <div className="tool-icons">
            <FiPaperclip size={24} />
            <MdOutlinePhotoSizeSelectActual size={24} />
            <IoLocationOutline size={24} />
          </div>
        </div>
        <button className="post-button" onClick={handlePost}>
          โพสต์
        </button>
      </div>
    </main>
  );
};

export default PostCreator;
