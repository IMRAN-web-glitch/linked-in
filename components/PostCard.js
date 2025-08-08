import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p className="post-meta">
        Posted by {post.author} on {new Date(post.timestamp).toLocaleString()}
      </p>
    </div>
  );
};

export default PostCard;