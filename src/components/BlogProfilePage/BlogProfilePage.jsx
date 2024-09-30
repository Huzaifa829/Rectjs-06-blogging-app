import React from 'react';

function BlogProfilePage({ blogs, profile }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Cover Image */}
      <div
        className="w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${profile?.coverImgUrl || 'https://placekitten.com/200/200'})` }}
      ></div>

      {/* Profile Image */}
      <div className="-mt-16 rounded-full border-4 border-white">
        <img
          src={profile?.imgUrl || 'https://placekitten.com/200/200'}
          alt="Profile"
          className="rounded-full w-32 h-32"
        />
      </div>

      {/* Profile Info */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold">{profile?.username || 'John Doe'}</h2>
        <p className="text-gray-500">{profile?.email || 'johndoe@example.com'}</p>
      </div>

      {/* Blog Posts Section */}
      <div className="w-full max-w-4xl mt-8 px-4">
        {blogs?.length > 0 ? (
          blogs.map((blog, index) => (
            <div key={index} className="card bg-white shadow-lg mb-6">
              <div className="card-body">
                {/* Post Header */}
                <div className="flex items-center">
                  <img
                    src={blog.imgUrl || 'https://placekitten.com/50/50'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{blog.username}</h3>
                    <p className="text-sm text-gray-500">Posted on {new Date(blog.time.seconds * 1000).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Blog Post Text */}
                <p className="mt-4 text-gray-700">{blog.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No blogs available.</p>
        )}
      </div>
    </div>
  );
}

export default BlogProfilePage;
