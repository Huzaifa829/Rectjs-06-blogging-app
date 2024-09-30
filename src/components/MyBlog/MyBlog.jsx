import React, { useState } from 'react'
import { deleteBlogFromFirestore, updateDocument } from '../../configs/FirebaseMethod';
import alertify from 'alertifyjs';
import { Timestamp } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setCurrentUserPostBlogDt } from '../../configs/redux/reducers/CurrentPostBlog';

function MyBlog({ blog }) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteLoadbtn, setdeleteLoadbtn] = useState(false);
  const [editedText, setEditedText] = useState(blog.text);
  const dispatch = useDispatch()





  const handleEdit = () => {
    setIsEditing(true);
  };
  const deleteblogDt = async (id) => {
    setdeleteLoadbtn(true)
    const getdt = await deleteBlogFromFirestore("blogs", id)
    if (getdt.success) {
      alertify.success(getdt.message)
      dispatch(setCurrentUserPostBlogDt(`${Timestamp.fromDate(new Date())}`))
      setdeleteLoadbtn(false)

    }
    else {
      alertify.error(getdt.message)
    setdeleteLoadbtn(false)

    }
  };


  const handleUpdate = async (id) => {
    console.log("Updated Blog ID:", id);
    console.log("Updated Blog Text:", editedText);
    if (editedText === '') {
      alertify.error('add some text')
    }
    else {
      setIsEditing(false);
      const get = await updateDocument('blogs', id, {
        text: editedText,
        time: Timestamp.fromDate(new Date())
      })
      if (get.success) {
        alertify.success(get.message)
      }

    }
  };

  return (
    <div className="w-full max-w-xl mt-10 p-5 bg-white shadow-xl rounded-lg">
      <div className="flex items-center mb-5">
        <img
          src={blog.profileImage || "https://via.placeholder.com/50"} // Display profile image
          alt="Profile"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg text-black font-semibold">{blog.username || "Anonymous"}</h3> {/* Display username */}
          <p className="text-sm text-black">
            {blog.date} - {blog.time}
          </p>
        </div>
      </div>

      <h2 className="text-xl text-black font-bold mb-3">{blog.title}</h2> {/* Display blog title */}

      <textarea
        type="text"
        value={editedText} // Bind textarea to editedText state
        readOnly={!isEditing} // Make textarea editable only in editing mode
        onChange={(e) => setEditedText(e.target.value)} // Update text on change
        className={`w-full text-black mb-5 border border-gray-300 rounded p-2 ${!isEditing && 'cursor-not-allowed'}`} // Conditional styling for read-only state
      />

      <div className="flex justify-between">
        {isEditing ? (
          <button
            className="btn btn-outline btn-success"
            onClick={() => handleUpdate(blog.id)} // Handle update click
          >
            Update
          </button>
        ) : (
          <>
            <button
              className="btn btn-outline btn-warning"
              onClick={handleEdit} // Handle edit click
            >
              Edit
            </button>
            <button
              disabled={deleteLoadbtn}
              onClick={() => deleteblogDt(blog.id)}
              className="btn btn-outline btn-error">
              {
                deleteLoadbtn ?
                  <span className="loading loading-spinner loading-lg"></span>
                  : "Delete"
              }

            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MyBlog;
