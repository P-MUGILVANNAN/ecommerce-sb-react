import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div 
            className="offcanvas-lg offcanvas-start bg-dark text-white p-3 shadow border-end border-secondary d-flex flex-column sidebar-container" 
            id="sidebar"
            tabIndex="-1"
            aria-labelledby="sidebarLabel"
        >
            <div className="d-flex d-lg-none justify-content-end mb-2">
                <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    data-bs-dismiss="offcanvas" 
                    data-bs-target="#sidebar" 
                    aria-label="Close"
                ></button>
            </div>

            <div className="text-center py-4 border-bottom border-secondary mb-4">
                <div className="bg-primary bg-gradient rounded-circle mx-auto d-flex align-items-center justify-content-center mb-2 shadow-lg" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-shield-lock-fill fs-3 text-white"></i>
                </div>
                <h6 className="mb-0 fw-bold tracking-wide">ADMIN PORTAL</h6>
                <small className="text-muted">Control Center</small>
            </div>

            <ul className="nav nav-pills flex-column mb-auto gap-2">
                <li className="nav-item" data-bs-dismiss="offcanvas" data-bs-target="#sidebar">
                    <NavLink to="/dashboard" className={({ isActive }) => `nav-link align-middle px-3 py-3 rounded-3 transition d-flex align-items-center gap-3 text-light ${isActive ? 'bg-primary bg-gradient active shadow' : 'hover-bg-secondary'}`}>
                        <i className="bi bi-speedometer2 fs-5"></i>
                        <span className="ms-1 fw-medium">Dashboard</span>
                    </NavLink>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas" data-bs-target="#sidebar">
                    <NavLink to="/products" className={({ isActive }) => `nav-link align-middle px-3 py-3 rounded-3 transition d-flex align-items-center gap-3 text-light ${isActive ? 'bg-primary bg-gradient active shadow' : 'hover-bg-secondary'}`}>
                        <i className="bi bi-box-seam fs-5"></i>
                        <span className="ms-1 fw-medium">Products</span>
                    </NavLink>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas" data-bs-target="#sidebar">
                    <NavLink to="/add-product" className={({ isActive }) => `nav-link align-middle px-3 py-3 rounded-3 transition d-flex align-items-center gap-3 text-light ${isActive ? 'bg-primary bg-gradient active shadow' : 'hover-bg-secondary'}`}>
                        <i className="bi bi-plus-circle fs-5"></i>
                        <span className="ms-1 fw-medium">Add Product</span>
                    </NavLink>
                </li>
            </ul>

            <div className="pt-3 border-top border-secondary mt-auto" data-bs-dismiss="offcanvas" data-bs-target="#sidebar">
                <button onClick={handleLogout} className="btn btn-link nav-link px-3 py-3 rounded-3 text-danger d-flex align-items-center gap-3 w-100 text-start border-0 shadow-none hover-bg-danger-light transition">
                    <i className="bi bi-box-arrow-right fs-5"></i>
                    <span className="ms-1 fw-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
