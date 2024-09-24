import React from 'react'

function PostBlogForm() {
  return (
    <div className="w-full max-w-xl p-5 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl text-black font-bold text-center mb-5">Post a Blog</h2>
    <form>
      <div className="mb-4">
        <label className="block text-black text-sm mb-2">Blog Title</label>
        <input
          type="text"
          name="title"
          className="input text-black input-bordered w-full bg-gray-100 border-gray-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2 text-black">Blog Text</label>
        <textarea
          name="text"
          className="textarea text-black textarea-bordered w-full bg-gray-100 border-gray-600"
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
