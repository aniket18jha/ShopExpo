import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/products/${id}`).then(r => setProduct(r.data)).catch(() => {});
  }, [id]);

  const addToCart = async () => {
    try {
      await API.post('/cart/add', { productId: id, quantity: qty });
      alert('Added to cart');
      navigate('/cart');
    } catch (err) {
      alert('Please login to continue');
      navigate('/login');
    }
  };

  if (!product) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-center">
        
        {/* Product Image */}
        <div className="col-md-6 text-center">
          {product.photo ? (
            <img
              src={`http://localhost:5000${product.photo}`}
              alt={product.name}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          ) : (
            <div className="bg-light d-flex align-items-center justify-content-center rounded shadow-sm" style={{ height: "400px" }}>
              <span className="text-muted">No Image Available</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-success fw-bold mb-3">₹{product.price}</h4>
          <p>
            Store:{" "}
            <Link to={`/store/${product.store._id}`} className="text-decoration-none fw-semibold">
              {product.store.name}
            </Link>
          </p>

          {/* Quantity Selector */}
          <div className="d-flex align-items-center mb-4">
            <label className="me-2 fw-semibold">Quantity:</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={e => setQty(e.target.value)}
              className="form-control"
              style={{ width: "100px" }}
            />
          </div>

          {/* Add to Cart Button */}
          <button onClick={addToCart} className="btn btn-primary btn-lg w-100">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
