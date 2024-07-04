import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Post from './Post';
import PostForm from './PostForm';
import './Feed.css';

const socket = io('http://localhost:4000');

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();

    socket.on('newPost', (newPost) => {
      setPosts(prevPosts => [newPost, ...prevPosts]);
    });

    socket.on('updatePost', (updatedPost) => {
      setPosts(prevPosts => prevPosts.map(post => post._id === updatedPost._id ? updatedPost : post));
    });

    socket.on('deletePost', (deletedPostId) => {
      setPosts(prevPosts => prevPosts.filter(post => post._id !== deletedPostId));
    });

    return () => {
      socket.off('newPost');
      socket.off('updatePost');
      socket.off('deletePost');
    };
  }, []);

  const handleNewPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/posts/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="feed">
      <PostForm onNewPost={handleNewPost} />
      {posts.map(post => (
        <Post key={post._id} post={post} onDelete={handleDeletePost} />
      ))}
    </div>
  );
};

export default Feed;
