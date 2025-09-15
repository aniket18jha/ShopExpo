import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/api';

export default function StorePage() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get(`/stores/${id}`).then(r => setStore(r.data)).catch(() => {});
    API.get(`/products?store=${id}`).then(r => setProducts(r.data)).catch(() => {});
  }, [id]);

  if (!store) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">

      {/* Store Header Section */}
      <div className="card shadow-sm border-0 mb-5">
        <div className="row g-0 align-items-center">
          <div className="col-md-4 text-center">
            {store.photo && (
              <img
                src={`http://localhost:5000${store.photo}`}
                alt={store.name}
                className="img-fluid rounded-start"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="fw-bold">{store.name}</h2>
              <p className="text-muted mb-1">Vendor: {store.vendor?.name}</p>
              <p className="mb-0">
                Welcome to <span className="fw-semibold">{store.name}</span>!  
                Explore our exclusive collection of products below.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <h3 className="mb-4 text-center fw-bold">🛒 Products from {store.name}</h3>
      <div className="row g-4">
        {products.map(p => (
          <div key={p._id} className="col-lg-3 col-md-4 col-sm-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <Link
                  to={`/product/${p._id}`}
                  className="text-decoration-none"
                >
                  <h5 className="card-title fw-bold">{p.name}</h5>
                </Link>
                <p className="text-success fw-bold">₹{p.price}</p>
              </div>
              <div className="card-footer bg-white text-center">
                <button className="btn btn-outline-primary btn-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
