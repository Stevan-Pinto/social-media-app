import React, { useState } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection';
import './Post.css';

const Post = ({ post, onDelete }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/posts/${post._id}/like`);
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (comment) => {
    try {
      const response = await axios.post(`http://localhost:4000/posts/${post._id}/comment`, { comment });
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/posts/${post._id}`);
      onDelete(post._id); // Update state or UI after successful deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="post">
      <p>{post.content}</p>
      {post.imageUrl && <img src={`http://localhost:4000/${post.imageUrl}`} alt="Post" />}
      <div className="post__actions">
        <button onClick={handleLike}>Like ({likes})</button>
        <button onClick={handleDelete}>Delete</button>
        <CommentSection comments={comments} onAddComment={handleComment} />
      </div>
    </div>
  );
};

export default Post;
