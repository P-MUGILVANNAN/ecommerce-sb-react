import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm border-bottom border-secondary">
            <div className="container-fluid">
                <button 
                    className="btn btn-outline-light d-lg-none me-3 d-flex align-items-center justify-content-center" 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#sidebar" 
                    aria-controls="sidebar"
                    style={{ width: '40px', height: '40px', padding: 0 }}
                >
                    <i className="bi bi-list fs-4"></i>
                </button>
                
                <span className="navbar-brand fs-4 fw-bold text-gradient">
                    <i className="bi bi-cart4 text-primary me-2"></i>
                    E-Commerce Admin
                </span>
                
                <div className="d-flex align-items-center ms-auto">
                    <div className="d-flex align-items-center me-4">
                        <div className="avatar me-2 bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
                            {user ? user.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="text-light d-none d-sm-block">
                            <small className="text-light d-block" style={{ fontSize: '0.75rem' }}>Logged in as</small>
                            <span className="fw-semibold">{user || 'Admin'}</span>
                        </div>
                    </div>
                    
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded-pill transition">
                        <i className="bi bi-box-arrow-right"></i>
                        <span className="d-none d-md-inline">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
