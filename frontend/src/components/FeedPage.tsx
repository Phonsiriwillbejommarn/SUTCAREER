import React from 'react';
import PostCard from './PostCard';
import type { Post } from './PostCard';

interface FeedPageProps {
  posts: Post[];
}

const FeedPage: React.FC<FeedPageProps> = ({ posts }) => {
  return (
    <main className="feed-container">
      {posts.length > 0 ? (
        posts.map(post => <PostCard key={post.id} post={post} />)
      ) : (
        <p>ยังไม่มีโพสต์...</p>
      )}
    </main>
  );
};

export default FeedPage;