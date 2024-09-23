import React from 'react'

function MyBlog({blog}) {
  return (
    <div className="w-full max-w-xl mt-10 p-5 bg-gray-900 shadow-lg rounded-lg">
    <div className="flex items-center mb-5">
      <img
        src="https://via.placeholder.com/50"
        alt="Profile"
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold">John Doe</h3>
        <p className="text-sm text-gray-400">
          {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
    <h2 className="text-xl font-bold mb-3">{blog.title}</h2>
    <p className="text-gray-300 mb-5">{blog.text}</p>
    <div className="flex justify-between">
      <button className="btn btn-outline btn-warning">Edit</button>
      <button className="btn btn-outline btn-error">Delete</button>
    </div>
  </div>
  )
}

export default MyBlog
