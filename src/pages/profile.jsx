// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { MapPin, User2 } from 'lucide-react';

const LOCAL_PROFILE_KEY = 'profileData';

// Modal Component
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, logout, deleteAccount } = useAuthStore();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [editOpen, setEditOpen] = useState(false);

  // Form inputs
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editMap, setEditMap] = useState('');

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_PROFILE_KEY));
    if (local) {
      setData(local);
      setEditName(local.name || '');
      setEditPhone(local.phone || '');
      setEditAddress(local.address || '');
      setEditMap(local.map || '');
    }

    fetch("http://192.168.80.246:8000/profile/", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Avval login qiling");
        return res.json();
      })
      .then(data => {
        setData(data);
        setEditName(data.name || '');
        setEditPhone(data.phone || '');
        setEditAddress(data.address || '');
        setEditMap(data.map || '');
        localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data));
      })
      .catch(err => {
        if (!local) setError(err.message);
      });
  }, []);

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

  const handleEditOpen = async () => {
    setEditOpen(true);

    if (!editAddress && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            const json = await res.json();
            const city = json.address?.city || json.address?.town || json.address?.village || '';
            const country = json.address?.country || '';
            const full = `${city}, ${country}`;
            setEditAddress(full);
          } catch (e) {
            console.log("Joylashuv aniqlanmadi");
          }
        },
        () => {
          console.log("Joylashuvga ruxsat berilmadi");
        }
      );
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...data,
      name: editName,
      phone: editPhone,
      address: editAddress,
      map: editMap
    };
    setData(updatedData);
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(updatedData));
    setEditOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center">
        <div className="bg-blue-500 rounded-full p-4 mb-4">
          <User2 className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{data?.name || 'Guest'}</h2>
        <p className="text-gray-600 mb-2">{data?.phone || 'No phone number'}</p>
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          {data?.address || 'No address'}
        </div>

        {data?.map && (
          <div className="w-full mb-4">
            <iframe
              src={data.map}
              title="Map"
              className="w-full h-40 rounded"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <button
            onClick={handleEditOpen}
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

        {error && <div className="text-red-500 mt-4 text-sm">{error}</div>}
      </div>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Phone:</label>
            <input
              type="text"
              value={editPhone}
              onChange={e => setEditPhone(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Address:</label>
            <input
              type="text"
              value={editAddress}
              onChange={e => setEditAddress(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
