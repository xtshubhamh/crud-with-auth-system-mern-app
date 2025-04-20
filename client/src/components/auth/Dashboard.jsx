import React, { useEffect, useState } from 'react';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      navigate("/login");
    }
  };

  const logout = async () => {
    await API.post("/auth/logout");
    navigate("/login");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
};

export default Dashboard;
