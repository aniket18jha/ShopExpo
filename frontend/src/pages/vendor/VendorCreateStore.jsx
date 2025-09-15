import React, { useState } from 'react';
import API from '../../api/api';

export default function VendorCreateStore() {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    if (photo) form.append('photo', photo);
    try {
      const res = await API.post('/stores', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Store created successfully 🎉');
      window.location.href = `/store/${res.data._id}`;
    } catch (err) {
      alert(err.response?.data?.msg || 'Error creating store');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center mb-4 text-primary fw-bold">Create Your Store</h3>
              
              <form onSubmit={submit}>
                {/* Store Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Store Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter store name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Store Photo */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Store Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <i className="bi bi-shop me-2"></i> Create Store
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
