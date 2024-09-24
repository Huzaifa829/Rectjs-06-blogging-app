import React from 'react'

function SettingCardProfile() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="card w-96 bg-white shadow-xl rounded-lg">
      {/* Profile Image */}
      <figure className="px-10 pt-10">
        <img
          src="https://placekitten.com/200/200"
          alt="Profile"
          className="rounded-full w-32 h-32"
        />
      </figure>
      
      {/* Profile Details */}
      <div className="card-body text-center">
        <h2 className="card-title text-2xl font-bold">John Doe</h2>
        <p className="text-gray-500">johndoe@example.com</p>

        {/* Password Heading */}
        <h3 className="mt-6 text-xl font-semibold">Change Password</h3>

        {/* Password Input Fields */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Old Password</span>
          </label>
          <input
            type="password"
            placeholder="Old Password"
            className="input input-bordered"
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">New Password</span>
          </label>
          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered"
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Repeat New Password</span>
          </label>
          <input
            type="password"
            placeholder="Repeat New Password"
            className="input input-bordered"
          />
        </div>

        {/* Save Button */}
        <div className="card-actions justify-end mt-6">
          <button className="btn btn-primary w-full">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SettingCardProfile
