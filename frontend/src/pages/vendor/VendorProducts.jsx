import React, { useEffect, useState } from 'react';
import API from '../../api/api';
import { Link } from 'react-router-dom';

export default function VendorProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products')
      .then((r) => {
        const me = JSON.parse(localStorage.getItem('user') || 'null');
        const mine = r.data.filter(
          (p) => p.vendor === me.id || (p.store && p.store.vendor === me.id)
        );
        setProducts(mine);
      })
      .catch(() => {});
  }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete product?')) return;
    await API.delete(`/products/${id}`);
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">
          <i className="bi bi-box-seam me-2"></i> My Products
        </h3>
        <Link to="add" className="btn btn-success">
          <i className="bi bi-plus-circle me-1"></i> Add Product
        </Link>
      </div>

      {/* Products Grid */}
      <div className="row g-4">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} className="col-md-4 col-lg-3">
              <div className="card shadow-sm h-100 border-0 rounded-3">
                {/* Product Image Placeholder */}
                <img
                  src={p.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                  className="card-img-top rounded-top"
                  alt={p.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{p.name}</h5>
                  <p className="card-text text-muted mb-2">₹{p.price}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      onClick={() => remove(p._id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                    <Link
                      to={`/products/${p._id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="bi bi-eye me-1"></i> View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No products found. Add your first product!</p>
        )}
      </div>
    </div>
  );
}
