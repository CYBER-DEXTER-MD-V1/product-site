import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });

  const register = async () => {
    await axios.post('http://localhost:5000/api/register', form);
    alert('Registered! Now log in.');
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="w-full mb-2 p-2 border" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input className="w-full mb-2 p-2 border" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select className="w-full mb-4 p-2 border" onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={register}>Register</button>
    </div>
  );
}
