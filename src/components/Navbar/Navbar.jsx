import React, { useEffect } from 'react';
import ImgLogo from '../../assets/bloglogo3.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetDtaFromUserUid_DB, subscribeToAuthChanges, logoutUser } from '../../configs/FirebaseMethod'; // Import your logout method
import { setCurrentUserData } from '../../configs/redux/reducers/CurrentUser';

function Navbar() {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.CurrentUser.currentUserdta);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (userUid) => {
      const { userData } = await GetDtaFromUserUid_DB(userUid, "users");
      dispatch(setCurrentUserData(userData));
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call your Firebase logout function
      dispatch(setCurrentUserData(null)); // Reset user data in Redux store
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div style={{ border: '1px solid black' }} className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/">
          <img width={200} src={ImgLogo} alt="" />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        {selector ? (
          <div className="dropdown dropdown-end">
            <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {
                  selector.imgUrl ? <img
                    alt="Profile"
                    src={selector.imgUrl}
                    className="w-full h-full object-cover"
                  /> :
                    <img
                      alt="Profile"
                      src="https://via.placeholder.com/150"
                      className="w-full h-full object-cover"
                    />
                }
              </div>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <Link to='/'><li>Home</li></Link>
              <Link to='/myblogs'><li>My Blogs</li></Link>
              <Link to='/setting'><li>Settings</li></Link>
              <li onClick={handleLogout} className="cursor-pointer">Logout</li> {/* Call handleLogout on click */}
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/authForm" className="btn">Login</Link>
            <Link to="/" className="btn">Home</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
