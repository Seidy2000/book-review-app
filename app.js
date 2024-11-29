import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', rating: '', reviewText: '' });

  const fetchReviews = async () => {
    const response = await axios.get('http://localhost:3000/reviews');
    setReviews(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/reviews', form);
    fetchReviews();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/reviews/${id}`);
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h1>Book Reviews</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Author" onChange={e => setForm({ ...form, author: e.target.value })} />
        <input placeholder="Rating" type="number" onChange={e => setForm({ ...form, rating: e.target.value })} />
        <textarea placeholder="Review" onChange={e => setForm({ ...form, reviewText: e.target.value })}></textarea>
        <button type="submit">Add Review</button>
      </form>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            {review.title} by {review.author} - {review.rating} stars
            <button onClick={() => handleDelete(review._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
