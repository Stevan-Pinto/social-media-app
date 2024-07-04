// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Dashboard.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    // Connect to the server
    const socket = io('http://localhost:4000');

    // Listen for new posts
    socket.on('newPost', (post) => {
      setPosts((prevPosts) => [post, ...prevPosts]);
    });

    // Listen for post updates (likes, comments)
    socket.on('updatePost', (updatedPost) => {
      setPosts((prevPosts) => prevPosts.map(post => 
        post._id === updatedPost._id ? updatedPost : post
      ));
    });

    // Fetch initial posts
    fetch('http://localhost:4000/posts')
      .then(response => response.json())
      .then(data => setPosts(data));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="postList">
        {posts.map(post => (
          <div key={post._id} className="post">
            <p>{post.content}</p>
            {post.imageUrl && <img src={`http://localhost:4000/uploads/${post.imageUrl}`} alt="Post" />}
            <div>
              <span>Likes: {post.likes}</span>
              <div className="comments">
                {post.comments.map((comment, index) => (
                  <p key={index}>{comment.comment}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
