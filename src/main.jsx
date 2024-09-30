import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './Screens/Home/Home.jsx'
import Layout from './Layout.jsx'
import AuthForm from './Screens/authentication/AuthForm.jsx'
import MyBlogs from './Screens/MyBlogs/MyBlogs.jsx'
import SettingCardProfile from './components/SettingCardProfile/SettingCardProfile.jsx'
import ProtectedRoutes from './components/ProtectedRoute/ProtectedRoutes.jsx';
import { store } from './configs/redux/store/store.js';
import { Provider } from 'react-redux';
import PostUserProfile from './Screens/PostUserProfile/PostUserProfile.jsx';

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
        element:<ProtectedRoutes component={<MyBlogs/>}/>
        // element:<MyBlogs/>
      },
      {
        path:'setting',
        element:<ProtectedRoutes component={<SettingCardProfile/>}/>
        
        // element:<SettingCardProfile/>
      },
      {
        path:'blogprofilepage/:id',
        element:<ProtectedRoutes component={<PostUserProfile/>}/>
        // element:<BlogProfilePage/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
 <RouterProvider  router={route}>

 </RouterProvider>
 </Provider>
    
  
)
