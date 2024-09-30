import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addBlogPost } from '../../configs/FirebaseMethod';
import alertify from 'alertifyjs';
import { setCurrentUserPostBlogDt } from '../../configs/redux/reducers/CurrentPostBlog';
import { Timestamp } from 'firebase/firestore';

function PostBlogForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false); // Loading state
  const curentUser = useSelector(state => state.CurrentUser.currentUserdta);
const dispatch = useDispatch()
  const onSubmit = async (data) => {
    const obj = {
      ...data,
      ...curentUser
    };

    setLoading(true); // Set loading to true when the form is submitted

    // Call addBlogPost and get the result
    const result = await addBlogPost(obj, "blogs");

    if (result.success) {
      dispatch(setCurrentUserPostBlogDt(`${Timestamp.fromDate(new Date())}`))
      alertify.success('Posted Successfully');
      reset(); 
    } else {
      alertify.error('Posted Error');
    }
  
  setLoading(false); 

    };

  return (
    <div className="w-full max-w-xl p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl text-black font-bold text-center mb-5">Post a Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-black text-sm mb-2">Blog Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required', minLength: { value: 5, message: 'Title must be at least 5 characters' } })}
            className="input text-black input-bordered w-full bg-gray-100 border-gray-600"
            disabled={loading} // Disable input during loading
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2 text-black">Blog Text</label>
          <textarea
            {...register('text', { required: 'Text is required', minLength: { value: 20, message: 'Text must be at least 20 characters' }, maxLength: { value: 300, message: 'Text must be less than 300 characters' } })}
            className="textarea text-black textarea-bordered w-full bg-gray-100 border-gray-600"
            rows="5"
            disabled={loading} // Disable textarea during loading
          ></textarea>
          {errors.text && <p className="text-red-500 text-sm">{errors.text.message}</p>}
        </div>
        <button 
          type="submit" 
          className={`btn btn-primary w-full ${loading ? 'loading' : ''}`} 
          disabled={loading} // Disable button during loading
        >
          {loading ? 'Posting...' : 'Post Blog'}
        </button>
      </form>
    </div>
  );
}

export default PostBlogForm;
