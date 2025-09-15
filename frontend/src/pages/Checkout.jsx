import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [address, setAddress] = useState({
    name: '',
    line1: '',
    city: '',
    state: '',
    postalCode: '',
    phone: ''
  });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/cart/checkout', { address });
      alert('Order placed: ' + res.data._id);
      nav('/');
    } catch (err) {
      alert('Checkout failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4 fw-bold">Checkout</h2>
        <form onSubmit={submit}>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={address.name}
              onChange={e => setAddress({ ...address, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              placeholder="Street address"
              value={address.line1}
              onChange={e => setAddress({ ...address, line1: e.target.value })}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                value={address.city}
                onChange={e => setAddress({ ...address, city: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                placeholder="State"
                value={address.state}
                onChange={e => setAddress({ ...address, state: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Postal Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={e => setAddress({ ...address, postalCode: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Phone number"
                value={address.phone}
                onChange={e => setAddress({ ...address, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 mt-2">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
