import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { auth } from '../../configs/FirebaseMethod';

function SettingCardProfile() {
  const selector = useSelector((state) => state.CurrentUser.currentUserdta);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const { oldPassword, newPassword, repeatPassword } = data;
    setLoading(true);

    if (newPassword !== repeatPassword) {
      alertify.error('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const user = auth.currentUser;
      const credentials = EmailAuthProvider.credential(user.email, oldPassword);

      await reauthenticateWithCredential(user, credentials);

      await updatePassword(user, newPassword);
      alertify.success('Password updated successfully');
      reset();
    } catch (error) {
      alertify.error('Old password is incorrect or an error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="card w-96 bg-white shadow-xl rounded-lg relative"
        style={{
          backgroundImage: `url('https://example.com/path-to-background-image.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

        <figure className="px-10 pt-10 relative z-10">
          <img
            src={selector?.imgUrl || 'https://placekitten.com/200/200'}
            alt="Profile"
            className="rounded-full w-32 h-32"
          />
        </figure>

        <div className="card-body text-center relative z-10">
          <h2 className="card-title text-2xl font-bold text-white">
            {selector?.username || 'John Doe'}
          </h2>
          <p className="text-gray-300">
            {selector?.email || 'johndoe@example.com'}
          </p>

          <h3 className="mt-6 text-xl font-semibold text-white">Change Password</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Old Password</span>
              </label>
              <input
                type="password"
                placeholder="Old Password"
                className="input input-bordered"
                {...register('oldPassword', { required: 'Old password is required' })}
              />
              {errors.oldPassword && <p className="text-red-500">{errors.oldPassword.message}</p>}
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-white">New Password</span>
              </label>
              <input
                type="password"
                placeholder="New Password"
                className="input input-bordered"
                {...register('newPassword', { required: 'New password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              />
              {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-white">Repeat New Password</span>
              </label>
              <input
                type="password"
                placeholder="Repeat New Password"
                className="input input-bordered"
                {...register('repeatPassword', { required: 'Repeat password is required' })}
              />
              {errors.repeatPassword && <p className="text-red-500">{errors.repeatPassword.message}</p>}
            </div>

            <div className="card-actions justify-end mt-6">
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingCardProfile;
