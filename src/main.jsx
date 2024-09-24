import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Layout.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './Screens/Home/Home.jsx'
import Layout from './Layout.jsx'
import AuthForm from './Screens/authentication/AuthForm.jsx'
import MyBlog from './components/MyBlog/MyBlog.jsx'
import MyBlogs from './Screens/MyBlogs/MyBlogs.jsx'
import SettingCardProfile from './components/SettingCardProfile/SettingCardProfile.jsx'
import BlogProfilePage from './components/BlogProfilePage/BlogProfilePage.jsx'

const route = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'authForm',
        element:<AuthForm/>
      },
      {
        path:'myblogs',
        element:<MyBlogs/>
      },
      {
        path:'setting',
        element:<SettingCardProfile/>
      },
      {
        path:'blogprofilepage',
        element:<BlogProfilePage/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
 <RouterProvider router={route}>

 </RouterProvider>
    
  
)
