import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import SignupBuyer from './pages/SignupBuyer';
import SignupVendor from './pages/SignupVendor';
import StorePage from './pages/StorePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import VendorDashboard from './pages/vendor/VendorDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup-buyer" element={<SignupBuyer />} />
          <Route path="/signup-vendor" element={<SignupVendor />} />
          <Route path="/store/:id" element={<StorePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
          <Route path="/vendor/dashboard/*" element={<ProtectedRoute vendorOnly><VendorDashboard/></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}
