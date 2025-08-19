import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentPost from '../pages/StudentPost/StudentPost';
const MainRoutes: React.FC = () => {
    return (
      <Routes>
        <Route path="/" element={<StudentPost />} />
        <Route path="/" element={<FeedPage posts={posts} />} />
        {/* Component don't want navbar */}
      </Routes>
    );
  };
  
  export default MainRoutes;