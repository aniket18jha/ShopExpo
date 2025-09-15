import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";


export default function Header() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ background: "linear-gradient(90deg, #343a40, #212529)" }}>
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold fs-3 text-uppercase" to="/">
          <i className="bi bi-bag-check-fill me-2"></i> ShopExpo
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {/* Common Links */}
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/">Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold position-relative" to="/cart">
                <i className="bi bi-cart4 me-1"></i> Cart
                {/* Example Cart Badge */}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  
                </span>
              </Link>
            </li>

            {/* Not Logged In */}
            {!user && (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link fw-semibold" to="/login">Login</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link fw-semibold" to="/signup-buyer">Customer Signup</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link fw-semibold" to="/signup-vendor">Vendor Signup</Link>
                </li>
              </>
            )}

            {/* Logged In */}
            {user && (
              <>
                {user.role === 'vendor' && (
                  <li className="nav-item mx-2">
                    <Link className="nav-link fw-semibold" to="/vendor/dashboard">
                      <i className="bi bi-speedometer2 me-1"></i> Vendor Dashboard
                    </Link>
                  </li>
                )}

                {/* Dropdown for User */}
                <li className="nav-item dropdown mx-2">
                  <a
                    className="nav-link dropdown-toggle fw-semibold"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-1"></i> Hi, {user.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                    <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                    <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        onClick={logout}
                        className="dropdown-item text-danger"
                      >
                        <i className="bi bi-box-arrow-right me-1"></i> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
