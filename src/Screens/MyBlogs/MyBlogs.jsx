import React, { useState } from 'react'
import MyBlog from '../../components/MyBlog/MyBlog'
import PostBlogForm from '../../components/PostBlogForm/PostBlogForm'
import MyBlogProfilePic from '../../components/MyBlogProfilePic/MyBlogProfilePic';

function MyBlogs() {
  const [hblog, setBlog] = useState({
    title: "hfkjshd",
    text: "jkhdfjksfjshfjkshdfjsdhfjkshjfksjdkf",
    author: "John Doe", // You can change or make it dynamic
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    profileImage: "https://via.placeholder.com/50", // Placeholder image, you can replace
  });
  return (
    <div className="flex bg-gray-100  min-h-screen text-white">
      {/* Left side (Main Content) */}
      <div className="flex-grow p-10">
      <PostBlogForm />

        <MyBlog blog={hblog} />
      </div>

      {/* Right side (Fixed Profile Section) */}
      <MyBlogProfilePic />
    </div>
  )
}

export default MyBlogs
