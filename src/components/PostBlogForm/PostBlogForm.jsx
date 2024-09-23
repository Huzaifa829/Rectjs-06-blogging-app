import React from 'react'

function PostBlogForm() {
  return (
    <div className="w-full max-w-xl p-5 bg-gray-900 shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold text-center mb-5">Post a Blog</h2>
    <form>
      <div className="mb-4">
        <label className="block text-sm mb-2">Blog Title</label>
        <input
          type="text"
          name="title"
          className="input input-bordered w-full bg-gray-700 border-gray-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2">Blog Text</label>
        <textarea
          name="text"
          className="textarea textarea-bordered w-full bg-gray-700 border-gray-600"
          rows="5"
          required
        ></textarea>
      </div>
      <button className="btn btn-primary w-full">Post Blog</button>
    </form>
  </div>
  )
}

export default PostBlogForm
