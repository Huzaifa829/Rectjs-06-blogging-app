import React, { useState, useEffect } from 'react';
import BlogPostCard from '../../components/BlogPostCard/BlogPostCard';
import PopupComponent from '../../components/ImageUploadPopup/ImageUploadPopup';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useSelector } from 'react-redux';


function Home() {
  const [blogs, setBlogs] = useState([]);
  const curentUser2 = useSelector(state => state.currentUserPostBlog.currentUserPostBlogDt);

  

  // Fetch blogs from Firestore
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsCollectionRef = collection(db, "blogs");

      const q = query(


        blogsCollectionRef,
        orderBy("time", "desc")
      );
      try {
        const blogsSnapshot = await getDocs(q);
        const blogsList = blogsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogsList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [curentUser2]);

  return (
    <div className="App bg-gray-100 min-h-screen flex-col flex items-center justify-center p-4">
      {/* Heading and Welcome Message */}
      <PopupComponent />
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Blogging Community</h1>
        <p className="text-lg text-gray-600 mt-2">
          Stay connected, stay inspired, and explore insightful thoughts shared by our amazing bloggers!
        </p>
      </header>

      {/* All Blogs Heading */}
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">All Blogs</h2>

      {/* Blog Cards */}
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogPostCard
            key={blog.id}
            uid={blog.uid}
            profileImage={blog.imgUrl || "https://randomuser.me/api/portraits/men/32.jpg"} // Fallback to placeholder
            username={blog.username || "Anonymous"}
            title={blog.title || "Untitled Blog"}
            date={new Date(blog.time.seconds * 1000).toLocaleDateString()} // Convert Firestore timestamp to readable date
            text={blog.text || "No content available."}
          />
        ))
      ) : (
        <p className="text-lg text-gray-600 mt-4">No blogs found. Please check back later!</p>
      )}
    </div>
  );
}

export default Home;
