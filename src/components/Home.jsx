// PostListScreen.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';

export default function PostListScreen() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs"); {/* Use  `/api/blogs?page=${page}` inside () of axios.get to check infinite scrolling*/}
      setBlogs(response.data); // Set the blogs state with the new data fetched
    } catch (error) {
      console.error(error);
    }
  };

  fetchPosts();
}, [page]);

  const loadMorePosts = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {blogs.map(post => (
          <PostCard key={post._id}  title={post.title} content={post.content} />
        ))}
      </div>
      <button
        onClick={loadMorePosts}
        className="mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Load More
      </button>
    </div>
  );
}
