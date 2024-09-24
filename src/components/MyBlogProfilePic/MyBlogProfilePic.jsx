import React from 'react'

function MyBlogProfilePic() {
  return (
    <div className="w-72 bg-white shadow-lg rounded-lg h-auto text-white fixed right-0 top-15 h-screen p-6">
    <div className="text-center">
      <img
        src="https://via.placeholder.com/100"
        alt="Profile"
        className="w-30 h-40 rounded mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold text-black">John Doe</h2>
      <p className="text-gray-400">johndoe@example.com</p>
      <button className="btn btn-outline btn-info mt-4">Edit Profile</button>
    </div>
  </div>
  )
}

export default MyBlogProfilePic
