import React, { useState } from 'react';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} value={form.name} placeholder="Name" className="w-full p-2 border rounded" />
        <input name="email" onChange={handleChange} value={form.email} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" name="password" onChange={handleChange} value={form.password} placeholder="Password" className="w-full p-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
