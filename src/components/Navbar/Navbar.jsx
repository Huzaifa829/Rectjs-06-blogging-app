import React from 'react'
import ImgLogo from '../../assets/bloglogo3.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div style={{
        border:'1px solid black'
    }} className="navbar bg-base-100">
  <div className="flex-1">
    <Link to="/">
    <img width={200} src={ImgLogo} alt="" />
    </Link>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex="0"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       <Link to='/'> <li><a>Home</a></li></Link>
       <Link to='/myblogs'><li><a>My Blogs</a></li></Link> 
       <Link to='/setting'> <li><a>Settings</a></li></Link>
       <Link to='/authForm'> <li><a>Logout</a></li></Link>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar
