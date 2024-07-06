import React, { useState } from 'react';
import axios from 'axios';
import './PostForm.css';

const PostForm = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content && !image) {
      setError('Please add content or an image');
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      await axios.post('http://localhost:4000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Error creating post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="postForm">
      {error && <p className="error">{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        disabled={submitting}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        disabled={submitting}
      />
      <button type="submit" disabled={submitting}>Post</button>
    </form>
  );
};

export default PostForm;
