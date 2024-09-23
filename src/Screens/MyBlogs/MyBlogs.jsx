import React, { useState } from 'react'
import MyBlog from '../../components/MyBlog/MyBlog'
import PostBlogForm from '../../components/PostBlogForm/PostBlogForm'

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
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center py-10">
    <PostBlogForm />
    
    <MyBlog blog={hblog} />
  </div>
  )
}

export default MyBlogs
