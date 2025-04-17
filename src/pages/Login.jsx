import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      localStorage.setItem('user', JSON.stringify(res.data));
      res.data.role === 'admin' ? navigate('/admin') : navigate('/');
    } catch {
      alert('Login failed!');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="w-full mb-2 p-2 border" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input className="w-full mb-4 p-2 border" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={login}>Login</button>
    </div>
  );
}
