import React from 'react'
import { Link } from 'react-router-dom';

function MyBlogProfilePic({ imgUrl, username, email }) {
  return (
    <div className="w-72 bg-white shadow-lg rounded-lg h-auto text-white fixed right-0 top-15 h-screen p-6">
      <div className="text-center">
        <img
          src={imgUrl || "https://via.placeholder.com/100"} // Use the dynamic imgUrl prop or a placeholder if not provided
          alt="Profile"
          className="w-30 h-40 rounded mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-black">{username || "Anonymous"}</h2> {/* Use the dynamic username prop */}
        <p className="text-gray-400">{email || "no-email@example.com"}</p> {/* Use the dynamic email prop */}
       <Link to='/setting'> <button className="btn btn-outline btn-info mt-4">Edit Profile</button></Link>
      </div>
    </div>
  )
}

export default MyBlogProfilePic;
