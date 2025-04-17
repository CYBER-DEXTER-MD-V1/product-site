import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p._id} className="border rounded-xl p-4 shadow">
            <img src={`http://localhost:5000/uploads/${p.image}`} alt="" className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p>{p.description}</p>
            <p className="text-green-600 font-bold">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
