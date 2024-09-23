import React, { useState } from 'react';
import './AuthForm.css'; // Custom CSS for animations and styles
import { useForm } from 'react-hook-form';

const AuthForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isActive, setIsActive] = useState(false);

  const loginUserFromFirebase = (data) => {
    console.log(data);
    // Implement login logic here
  };

  const registerUserToFirebase = (data) => {
    console.log(data);
    // Implement registration logic here
  };

  const toggleForm = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  return (
    <div className='ha_main_login_contenar'>
      <div className={`ha-container ${isActive ? 'ha-active' : ''}`} id="ha-container">
        <div className="ha-form-container ha-sign-up">
          <form onSubmit={handleSubmit(registerUserToFirebase)}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <label className={`mb-2 mt-2 bg-[#eee] input input-bordered flex items-center gap-2 ${errors.username ? 'error' : ''}`}>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                {...register('username', {
                  required: 'Username is required',
                  pattern: {
                    value: /^[a-zA-Z]{4,10}$/,
                    message: 'Username must be between 4 and 10 letters'
                  }
                })}
              />
            </label>
            {errors.username && <span className='text-red-500'>{errors.username.message}</span>}
            <label className={`mb-2 mt-2 bg-[#eee] input input-bordered flex items-center gap-2 ${errors.email ? 'error' : ''}`}>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                  }
                })}
              />
            </label>
            {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
            <label className={`mb-2 mt-2 bg-[#eee] input input-bordered flex items-center gap-2 ${errors.password ? 'error' : ''}`}>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
            </label>
            {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
            <button type="submit">Sign Up</button>
            <button className="ha-hidden" onClick={toggleForm}>Already have an account?</button>
          </form>
        </div>
        <div className="ha-form-container ha-sign-in">
          <form onSubmit={handleSubmit(loginUserFromFirebase)}>
            <h1>Sign In</h1>
            <span>or use your email password</span>
            <label className={`mb-2 mt-2 bg-[#eee] input input-bordered flex items-center gap-2 ${errors.signinEmail ? 'error' : ''}`}>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register('signinEmail', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                  }
                })}
              />
            </label>
            {errors.signinEmail && <span className='text-red-500'>{errors.signinEmail.message}</span>}
            <label className={`mb-2 mt-2 bg-[#eee] input input-bordered flex items-center gap-2 ${errors.signinPassword ? 'error' : ''}`}>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...register('signinPassword', {
                  required: 'Password is required',
                })}
              />
            </label>
            {errors.signinPassword && <span className='text-red-500'>{errors.signinPassword.message}</span>}
            <a href="#">Forget Your Password?</a>
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
