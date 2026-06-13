import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getDashboardStats } from '../services/productService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        activeProducts: 0,
        outOfStockProducts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                toast.error('Could not load dashboard stats: ' + error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="d-flex min-vh-100 bg-dark text-white">
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column" style={{ overflowX: 'hidden' }}>
                <Navbar />
                <div className="container-fluid p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="fw-bold text-light mb-1">Dashboard</h2>
                            <p className="text-light mb-0">Overview of catalog indicators and stock alerts</p>
                        </div>
                        <Link to="/products" className="btn btn-outline-primary btn-sm rounded-pill px-3 py-2">
                            <i className="bi bi-box-seam me-1"></i> View Catalog
                        </Link>
                    </div>

                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center my-5 py-5">
                            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row g-4 mb-4">
                            {/* Total Products Card */}
                            <div className="col-12 col-md-4">
                                <div className="card bg-dark border-secondary rounded-4 shadow-sm overflow-hidden h-100 position-relative border-start border-4 border-primary">
                                    <div className="card-body p-4 d-flex align-items-center">
                                        <div className="bg-primary bg-opacity-25 text-primary rounded-3 p-3 me-3">
                                            <i className="bi bi-boxes fs-1"></i>
                                        </div>
                                        <div>
                                            <h6 className="card-subtitle mb-1 text-light text-uppercase fw-semibold tracking-wider" style={{ fontSize: '0.75rem' }}>Total Products</h6>
                                            <h2 className="card-title text-light mb-0 fw-bold">{stats.totalProducts}</h2>
                                        </div>
                                    </div>
                                    <div className="position-absolute bottom-0 end-0 opacity-10 p-2 me-2">
                                        <i className="bi bi-boxes text-primary" style={{ fontSize: '5rem' }}></i>
                                    </div>
                                </div>
                            </div>

                            {/* Active Products Card */}
                            <div className="col-12 col-md-4">
                                <div className="card bg-dark border-secondary rounded-4 shadow-sm overflow-hidden h-100 position-relative border-start border-4 border-success">
                                    <div className="card-body p-4 d-flex align-items-center">
                                        <div className="bg-success bg-opacity-25 text-success rounded-3 p-3 me-3">
                                            <i className="bi bi-check2-circle fs-1"></i>
                                        </div>
                                        <div>
                                            <h6 className="card-subtitle mb-1 text-light text-uppercase fw-semibold tracking-wider" style={{ fontSize: '0.75rem' }}>Active Products</h6>
                                            <h2 className="card-title text-light mb-0 fw-bold">{stats.activeProducts}</h2>
                                        </div>
                                    </div>
                                    <div className="position-absolute bottom-0 end-0 opacity-10 p-2 me-2">
                                        <i className="bi bi-check2-circle text-success" style={{ fontSize: '5rem' }}></i>
                                    </div>
                                </div>
                            </div>

                            {/* Out of Stock Card */}
                            <div className="col-12 col-md-4">
                                <div className="card bg-dark border-secondary rounded-4 shadow-sm overflow-hidden h-100 position-relative border-start border-4 border-danger">
                                    <div className="card-body p-4 d-flex align-items-center">
                                        <div className="bg-danger bg-opacity-25 text-danger rounded-3 p-3 me-3">
                                            <i className="bi bi-exclamation-triangle fs-1"></i>
                                        </div>
                                        <div>
                                            <h6 className="card-subtitle mb-1 text-light text-uppercase fw-semibold tracking-wider" style={{ fontSize: '0.75rem' }}>Out of Stock</h6>
                                            <h2 className="card-title mb-0 fw-bold text-danger">{stats.outOfStockProducts}</h2>
                                        </div>
                                    </div>
                                    <div className="position-absolute bottom-0 end-0 opacity-10 p-2 me-2">
                                        <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '5rem' }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick Start Guide or Welcome Banner */}
                    <div className="p-5 rounded-4 bg-gradient-dark border border-secondary shadow-lg mt-4 position-relative">
                        <div className="row align-items-center">
                            <div className="col-md-8">
                                <h3 className="fw-bold mb-2">Welcome to Admin Portal</h3>
                                <p className="text-light leading-relaxed">
                                    From this dashboard, you can track inventories, review active catalog assets, and execute full CRUD operations on inventory objects. Start adding new items, monitoring categories, or reviewing product stocks instantly.
                                </p>
                                <div className="d-flex gap-2 mt-4">
                                    <Link to="/add-product" className="btn btn-primary bg-gradient rounded-3 px-4 py-2">
                                        <i className="bi bi-plus-circle me-2"></i>Add First Product
                                    </Link>
                                    <Link to="/products" className="btn btn-outline-secondary rounded-3 px-4 py-2">
                                        <i className="bi bi-list-task me-2"></i>Product Catalog
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4 d-none d-md-block text-center">
                                <i className="bi bi-cpu text-primary opacity-75" style={{ fontSize: '7.5rem' }}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
