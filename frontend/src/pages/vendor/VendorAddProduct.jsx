import React, { useEffect, useState } from 'react';
import API from '../../api/api';

export default function VendorAddProduct() {
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({
    storeId: '',
    name: '',
    description: '',
    price: '',
    category: '',
    stock: 0
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    API.get('/stores').then(r => {
      const me = JSON.parse(localStorage.getItem('user') || 'null');
      const myStores = r.data.filter(s => s.vendor && s.vendor._id === me.id);
      setStores(myStores);
      if (myStores[0]) setForm(f => ({ ...f, storeId: myStores[0]._id }));
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('storeId', form.storeId);
    fd.append('name', form.name);
    fd.append('description', form.description);
    fd.append('price', form.price);
    fd.append('category', form.category);
    fd.append('stock', form.stock);
    images.forEach(img => fd.append('images', img));
    try {
      await API.post('/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('✅ Product added successfully!');
      window.location.href = '/vendor/dashboard/products';
    } catch (err) {
      alert(err.response?.data?.msg || '❌ Error while adding product');
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h3 className="mb-4 text-center text-primary">➕ Add New Product</h3>

        <form onSubmit={submit}>
          {/* Store Select */}
          <div className="mb-3">
            <label className="form-label">Select Store</label>
            <select
              className="form-select"
              value={form.storeId}
              onChange={e => setForm({ ...form, storeId: e.target.value })}
              required
            >
              <option value="">-- Choose a Store --</option>
              {stores.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter product description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          {/* Price & Category in one row */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter price"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter category"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Stock */}
          <div className="mb-3">
            <label className="form-label">Stock Quantity</label>
            <input
              type="number"
              className="form-control"
              placeholder="Available stock"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              required
            />
          </div>

          {/* Images */}
          <div className="mb-3">
            <label className="form-label">Upload Product Images</label>
            <input
              type="file"
              className="form-control"
              multiple
              accept="image/*"
              onChange={e => setImages([...e.target.files])}
              required
            />
          </div>

          {/* Submit */}
          <div className="d-grid">
            <button type="submit" className="btn btn-success btn-lg">
              🚀 Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
