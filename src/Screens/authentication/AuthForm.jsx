import React, { useEffect, useState } from 'react';
import './AuthForm.css'; // Custom CSS for animations and styles
import { useForm } from 'react-hook-form';
import { GetDtaFromUserUid_DB, loginWithFB, RegisterWithFB } from '../../configs/FirebaseMethod';
import alertify from 'alertifyjs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUserData } from '../../configs/redux/reducers/CurrentUser';
import { setCurrentUserPostBlogDt } from '../../configs/redux/reducers/CurrentPostBlog';

const AuthForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm();
  const {
    register: loginForm,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();
  // const { LoginForm, Submit, formState: { errors } } = useForm();
  const [isActive, setIsActive] = useState(false);

  const loginUserFromFirebase = async (data) => {
    console.log(data);
    try {
      const result = await loginWithFB(data);
      if (result.success) {
        // console.log('User:', result.user);

        alertify.success('Success! User Login Successfully');

        const result2 = await GetDtaFromUserUid_DB(result.user.uid,"users")
        console.log(result2.userData);
        
        dispatch(setCurrentUserData(result2))
        dispatch(setCurrentUserPostBlogDt(result2))
        // const curentUser2 = useSelector(state => state.currentUserPostBlog.currentUserPostBlogDt);


        navigate('/')

      } else {
        console.log(`Error: ${result.errorMessage}`);
        alertify.error(`Error!  ${result.errorMessage}`);
      }
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  const registerUserToFirebase = async (data) => {

    try {
      const result = await RegisterWithFB(data);
      if (result.success) {
        console.log('User:', result.user);

        alertify.success('Success! User Registered Successfully');
        const result2 = await GetDtaFromUserUid_DB(result.user.uid,"users")
        dispatch(setCurrentUserData(result2))
        
        navigate('/')


      } else {
        console.log(`Error: ${result.errorMessage}`);
        alertify.error('Error! Something went wrong');
      }
    } catch (error) {
      console.error('Registration Error:', error);
    }




  };

  const toggleForm = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  return (
    <div className='ha_main_login_contenar'>
      <div className={`ha-container ${isActive ? 'ha-active' : ''}`} id="ha-container">
        <div className="ha-form-container ha-sign-up">
          <form onSubmit={handleRegisterSubmit(registerUserToFirebase)}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <label className={`mb-2 mt-2 bg-[#eee] input input-bordered flex items-center gap-2 ${registerErrors.username ? 'error' : ''}`}>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                {...registerForm('username', {
                  required: 'Username is required',
                  pattern: {
                    value: /^[a-zA-Z]{4,10}$/,
                    message: 'Username must be between 4 and 10 letters'
                  }
                })}
              />
            </label>
            {registerErrors.username && <span className='text-red-500'>{registerErrors.username.message}</span>}
            <label className={`mb-2 mt-2 bg-[#eee] input input-bordered flex items-center gap-2 ${registerErrors.email ? 'error' : ''}`}>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...registerForm('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                  }
                })}
              />
            </label>
            {registerErrors.email && <span className='text-red-500'>{registerErrors.email.message}</span>}
            <label className={`mb-2 mt-2 bg-[#eee] input input-bordered flex items-center gap-2 ${registerErrors.password ? 'error' : ''}`}>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...registerForm('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
            </label>
            {registerErrors.password && <span className='text-red-500'>{registerErrors.password.message}</span>}
            <button type="submit">Sign Up</button>
            <button className="ha-hidden" onClick={toggleForm}>Already have an account?</button>
          </form>
        </div>
        <div className="ha-form-container ha-sign-in">
          <form onSubmit={handleLoginSubmit(loginUserFromFirebase)}>
            <h1>Sign In</h1>
            <span>or use your email password</span>
            <label className={`mb-2 mt-2 bg-[#eee] input input-bordered flex items-center gap-2 ${loginErrors.signinEmail ? 'error' : ''}`}>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...loginForm('signinEmail', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                  }
                })}
              />
            </label>
            {loginErrors.signinEmail && <span className='text-red-500'>{loginErrors.signinEmail.message}</span>}
            <label className={`mb-2 mt-2 bg-[#eee] input input-bordered flex items-center gap-2 ${loginErrors.signinPassword ? 'error' : ''}`}>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...loginForm('signinPassword', {
                  required: 'Password is required',
                })}
              />
            </label>
            {loginErrors.signinPassword && <span className='text-red-500'>{loginErrors.signinPassword.message}</span>}
            <button type="submit">Sign In</button>
            <button className="ha-hidden" onClick={toggleForm}>Register Now</button>
          </form>
        </div>
        <div className="ha-toggle-container">
          <div className={`${isActive ? 'ha-toggle' : 'ha-toggle2'}`}>
            <div className="ha-toggle-panel ha-toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="ha-hidden" onClick={toggleForm}>Sign In</button>
            </div>
            <div className="ha-toggle-panel ha-toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="ha-hidden" onClick={toggleForm}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
