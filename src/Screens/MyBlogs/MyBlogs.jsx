import React, { useEffect, useState } from 'react'
import MyBlog from '../../components/MyBlog/MyBlog'
import PostBlogForm from '../../components/PostBlogForm/PostBlogForm'
import MyBlogProfilePic from '../../components/MyBlogProfilePic/MyBlogProfilePic';
import { getallDataInLine } from '../../configs/FirebaseMethod';
import { useSelector } from 'react-redux';

function MyBlogs() {
  const [getdt, setgetdt] = useState(null)
  const curentUser = useSelector(state => state.CurrentUser.currentUserdta);
  const curentUser2 = useSelector(state => state.currentUserPostBlog.currentUserPostBlogDt);

  useEffect(() => {
    async function wse() {
      const dt = await getallDataInLine(curentUser.uid, "blogs")
      if (dt.success) {
        if (dt.arr == []) {
          
          setgetdt(null)
        }
        else{
          setgetdt(dt.arr)

          console.log(dt.arr);
          console.log(curentUser2);
          console.log(curentUser);
        }

      }
      else {
        dt.error
      }
    }
    wse()
  }, [curentUser,curentUser2])


  return (
    <div className="flex bg-gray-100  min-h-screen text-white">
      <div className="flex-grow p-10">
        <PostBlogForm />
        {
          getdt ? getdt.map((item) => (
            <MyBlog
              key={item.id}  
              blog={{
                id: item.id,
                profileImage: item.imgUrl,  
                username: item.username,    
                title: item.title,          
                text: item.text,             
                date: new Date(item.time.seconds * 1000).toLocaleDateString(),  
                time: new Date(item.time.seconds * 1000).toLocaleTimeString()  
              }}
            />
          )) :
            <h1 style={{
              color: 'black',
              fontSize: '4rem'
            }}>Post Your First Blog</h1>
        }
      </div>

      <MyBlogProfilePic
        imgUrl={curentUser?.imgUrl}
        username={curentUser?.username}
        email={curentUser?.email}
      />
    </div>
  )
}

export default MyBlogs;
