import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { MapPin, User2 } from 'lucide-react';

const Profile = () => {
  const { user, logout, deleteAccount } = useAuthStore();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.80.246:8000/profile/', {
      method: 'GET',
      credentials: 'include',  // bu cookie orqali session yuboradi
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);  // bu yerda user.name, user.phone bo'ladi
      });
  })


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      deleteAccount();
      navigate('/register');
    }
  };

  const handleEdit = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center">
        <div className="bg-blue-500 rounded-full p-4 mb-4">
          <User2 className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{user?.name || 'Guest'}</h2>
        <p className="text-gray-600 mb-2">{user?.email || 'No email'}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          {user?.address ? user.address : 'No address'}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Logout
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;