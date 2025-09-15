
import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/stores').then(r => setStores(r.data)).catch(() => {});
    API.get('/products').then(r => setProducts(r.data)).catch(() => {});
  }, []);

  return (
    <div className="container-fluid px-0">

      {/* Banner Slider */}
      <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel" style={{ marginTop: "px", paddingTop: "0px" }}>
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img src="../../Images/1.png" className="d-block w-100" style={{ height: "450px", objectFit: "cover" }} alt="Banner 1" />
            <div className="carousel-caption d-none d-md-block">
              {/* <h3 className="fw-bold text-light shadow" style={{ paddingTop: "10px" }}>Welcome to MultiVendor</h3>
              <p className="text-light">Shop from your favorite stores all in one place.</p> */}
            </div>
          </div>

          <div className="carousel-item">
            <img src="../../Images/2.png" className="d-block w-100" style={{ height: "450px", objectFit: "cover" }} alt="Banner 2" />
            <div className="carousel-caption d-none d-md-block">
              {/* <h3 className="fw-bold text-light shadow">Exclusive Deals</h3>
              <p className="text-light">Grab exciting offers before they run out.</p> */}
            </div>
          </div>

          <div className="carousel-item">
            <img src="../../Images/3.png" className="d-block w-100" style={{ height: "450px", objectFit: "cover" }} alt="Banner 3" />
            <div className="carousel-caption d-none d-md-block">
              {/* <h3 className="fw-bold text-light shadow">Trusted Vendors</h3>
              <p className="text-light">Shop with confidence from verified sellers.</p> */}
            </div>
          </div>

          <div className="carousel-item">
            <img src="../../Images/4.png" className="d-block w-100" style={{ height: "450px", objectFit: "cover" }} alt="Banner 4" />
            <div className="carousel-caption d-none d-md-block">
              {/* <h3 className="fw-bold text-light shadow">Latest Collections</h3>
              <p className="text-light">Discover trending products at best prices.</p> */}
            </div>
          </div>
          
          <div className="carousel-item">
            <img src="../../Images/5.png" className="d-block w-100" style={{ height: "450px", objectFit: "cover" }} alt="Banner 4" />
            <div className="carousel-caption d-none d-md-block">
              {/* <h3 className="fw-bold text-light shadow">Latest Collections</h3>
              <p className="text-light">Discover trending products at best prices.</p> */}
            </div>
          </div>

        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="0" className="active" aria-current="true"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="3"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="4"></button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">

        {/* Stores Section */}
        {/* <h2 className="mb-4 text-center fw-bold ">Our Stores</h2> */}
        <h2 className="text-center mb-4 fw-bold text-uppercase text-primary position-center d-inline-block pb-2">
  Our Stores
  <span className="position-absolute start-50 translate-middle-x w-40 border-bottom border-3 border-primary"></span>
</h2>
        <div className="row g-4">
          {stores.map(s => (
            <div key={s._id} className="col-md-4 col-sm-6">
              <div className="card h-100 shadow-sm border-0">
                {s.photo && (
                  <img
                    src={`http://localhost:5000${s.photo}`}
                    alt={s.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body text-center">
                  <Link to={`/store/${s._id}`} className="stretched-link text-decoration-none">
                    <h5 className="card-title fw-bold">{s.name}</h5>
                  </Link>
                  <p className="text-muted mb-0">Vendor: {s.vendor?.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Section */}
        {/* <h2 className="mt-5 mb-4 text-center fw-bold">Featured Products</h2> */}
        
             <h2 className="text-center mt-5 mb-4 fw-bold text-uppercase text-primary position-center d-inline-block pb-2">
  Featured Products
  <span className="position-absolute start-50 translate-middle-x w-40 border-bottom border-3 border-primary"></span>
</h2>

        <div className="row g-4">
          {products.map(p => (
            <div key={p._id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <Link to={`/product/${p._id}`} className="stretched-link text-decoration-none">
                    <h5 className="card-title fw-bold">{p.name}</h5>
                  </Link>
                  <p className="text-success fw-bold">₹{p.price}</p>
                  <p className="text-muted">
                    Store:{" "}
                    <Link to={`/store/${p.store._id}`} className="text-decoration-none">
                      {p.store.name}
                    </Link>
                  </p>
                </div>
                <div className="card-footer bg-white text-center">
                  <button className="btn btn-primary btn-sm">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
