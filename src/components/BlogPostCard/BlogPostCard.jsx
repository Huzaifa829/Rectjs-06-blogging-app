import React, { useState } from "react";

const BlogPostCard = ({ profileImage, username, title, date, text }) => {
  // State to track whether full text is shown
  const [showFullText, setShowFullText] = useState(false);

  // Function to toggle the text visibility
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  // Determine whether to show truncated text or full text
  const displayText = showFullText ? text : `${text.substring(0, 200)}...`;

  return (
    <div className="card max-w-ml bg-white shadow-xl rounded-lg overflow-hidden my-4 mx-auto">
      <div className="flex items-center space-x-4 p-4">
        {/* User Profile */}
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={profileImage} alt="profile" />
          </div>
        </div>
        {/* User Info */}
        <div>
          <h2 className="font-bold text-lg">{username}</h2>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="card-body p-4">
        <h3 className="card-title text-xl font-semibold">{title}</h3>
        <p className="text-gray-700 mt-2 break-words overflow-hidden">
          {displayText}
        </p>

        {/* See More Button at the Bottom */}
        {text.length > 200 && (
          <div className="mt-4">
            <span
              className="text-blue-500 cursor-pointer"
              onClick={toggleText}
            >
              {showFullText ? "See Less" : "See More"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostCard;
