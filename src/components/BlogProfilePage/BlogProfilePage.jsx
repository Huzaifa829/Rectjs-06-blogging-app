import React from 'react'

function BlogProfilePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Cover Image */}
      <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://placekitten.com/200/200')" }}>
      </div>

      {/* Profile Image */}
      <div className="-mt-16 rounded-full border-4 border-white">
        <img
          src="https://placekitten.com/200/200"
          alt="Profile"
          className="rounded-full w-32 h-32"
        />
      </div>

      {/* Profile Info */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold">John Doe</h2>
        <p className="text-gray-500">johndoe@example.com</p>
      </div>

      {/* Blog Posts Section */}
      <div className="w-full max-w-4xl mt-8 px-4">
        {/* Blog Post */}
        <div className="card bg-white shadow-lg mb-6">
          <div className="card-body">
            {/* Post Header */}
            <div className="flex items-center">
              <img
                src="https://placekitten.com/50/50"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg">John Doe</h3>
                <p className="text-sm text-gray-500">Posted on Sep 24, 2024 - 10:00 AM</p>
              </div>
            </div>

            {/* Blog Post Text */}
            <p className="mt-4 text-gray-700">
              This is an example blog post text. You can write your thoughts or share something interesting with the world.
            </p>
          </div>
        </div>

        {/* Another Blog Post */}
        <div className="card bg-white shadow-lg mb-6">
          <div className="card-body">
            <div className="flex items-center">
              <img
                src="https://placekitten.com/50/50"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg">John Doe</h3>
                <p className="text-sm text-gray-500">Posted on Sep 22, 2024 - 3:30 PM</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              Another sample blog post with some interesting content shared by the user.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogProfilePage