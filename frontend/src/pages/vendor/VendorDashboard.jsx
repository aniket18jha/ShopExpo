import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import VendorCreateStore from './VendorCreateStore';
import VendorProducts from './VendorProducts';
import VendorAddProduct from './VendorAddProduct';

export default function VendorDashboard() {
  return (
    <div className="container-fluid">
      {/* Dashboard Header */}
      <div className="bg-primary text-white p-3 mb-4 shadow-sm">
        <h2 className="mb-0 text-center fw-bold">
          <i className="bi bi-speedometer2 me-2"></i> Vendor Dashboard
        </h2>
      </div>

      <div className="row">
        {/* Sidebar Navigation */}
        <div className="col-md-3 col-lg-2 mb-4">
          <div className="list-group shadow-sm rounded-3">
            <Link
              to="create-store"
              className="list-group-item list-group-item-action"
            >
              <i className="bi bi-shop me-2"></i> Create Store
            </Link>
            <Link
              to="products"
              className="list-group-item list-group-item-action"
            >
              <i className="bi bi-box-seam me-2"></i> My Products
            </Link>
            <Link
              to="products/add"
              className="list-group-item list-group-item-action"
            >
              <i className="bi bi-plus-circle me-2"></i> Add Product
            </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="col-md-9 col-lg-10">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <Routes>
              <Route path="create-store" element={<VendorCreateStore />} />
              <Route path="products" element={<VendorProducts />} />
              <Route path="products/add" element={<VendorAddProduct />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
