import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: null });

  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then(res => setProducts(res.data));
  }, [products]);

  const submitProduct = async () => {
    const data = new FormData();
    data.append('name', form.name);
    data.append('price', form.price);
    data.append('description', form.description);
    data.append('image', form.image);
    await axios.post('http://localhost:5000/api/products', data);
    alert('Product added!');
  };

  const deleteProduct = async id => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <div className="mb-6 space-y-2">
        <input className="border p-2 w-full" placeholder="Product Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Price" type="number" onChange={e => setForm({ ...form, price: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
        <input type="file" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={submitProduct}>Add Product</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-4 rounded shadow">
            <img src={`http://localhost:5000/uploads/${p.image}`} className="w-full h-32 object-cover rounded" alt="" />
            <h3 className="font-bold">{p.name}</h3>
            <p>{p.description}</p>
            <p>${p.price}</p>
            <button className="text-red-500 mt-2" onClick={() => deleteProduct(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
