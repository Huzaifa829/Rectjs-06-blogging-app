import React from 'react';
import BlogPostCard from '../../components/BlogPostCard/BlogPostCard';

function Home() {
  return (
    <div className="App bg-gray-100 min-h-screen flex-col flex items-center justify-center p-4">
      {/* Heading and Welcome Message */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Blogging Community</h1>
        <p className="text-lg text-gray-600 mt-2">
          Stay connected, stay inspired, and explore insightful thoughts shared by our amazing bloggers!
        </p>
      </header>

      {/* All Blogs Heading */}
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">All Blogs</h2>

      {/* Blog Cards */}
      <BlogPostCard
        profileImage="https://randomuser.me/api/portraits/men/32.jpg"
        username="John Doe"
        title="A Journey into the World of Blogging"
        date="September 23, 2024"
        text="Blogging is an incredible platform to share your thoughts with the world
        displayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayText
        displayTextdisplayText
        "
      />
      <BlogPostCard
        profileImage="https://randomuser.me/api/portraits/men/32.jpg"
        username="John Doe"
        title="A Journey into the World of Blogging"
        date="September 23, 2024"
        text="Blogging is an incredible platform to share your thoughts with the world
        displayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayText
        displayTextdisplayText
        "
      />
      <BlogPostCard
        profileImage="https://randomuser.me/api/portraits/men/32.jpg"
        username="John Doe"
        title="A Journey into the World of Blogging"
        date="September 23, 2024"
        text="Blogging is an incredible platform to share your thoughts with the world
        displayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayTextdisplayText
        displayTextdisplayTextdisplayText
        displayTextdisplayText
        "
      />
    </div>
  );
}

export default Home;
