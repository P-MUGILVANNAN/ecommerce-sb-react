import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductTable from '../components/ProductTable';
import { getProducts, deleteProduct } from '../services/productService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination & Filter state
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [totalElements, setTotalElements] = useState(0);

    // Modal state
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts(page, pageSize, search, category, 'id', 'desc');
            setProducts(data.content || []);
            setTotalPages(data.totalPages || 0);
            setTotalElements(data.totalElements || 0);
        } catch (error) {
            toast.error('Could not fetch products: ' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, pageSize, category]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(0);
        fetchProducts();
    };

    const handleReset = () => {
        setSearch('');
        setCategory('');
        setPage(0);
        // We will trigger fetch by changing states or calling fetchProducts manually
    };

    // Trigger search fetch if search is cleared
    useEffect(() => {
        if (search === '') {
            fetchProducts();
        }
    }, [search]);

    const handleView = (product) => {
        setSelectedProduct(product);
        setShowViewModal(true);
    };

    const handleEdit = (product) => {
        navigate(`/edit-product/${product.id}`);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedProduct) return;
        try {
            await deleteProduct(selectedProduct.id);
            toast.success('Product deleted successfully!');
            setShowDeleteModal(false);
            setSelectedProduct(null);
            fetchProducts();
        } catch (error) {
            toast.error('Failed to delete product: ' + error);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(price);
    };

    return (
        <div className="d-flex min-vh-100 bg-dark text-white">
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column" style={{ overflowX: 'hidden' }}>
                <Navbar />
                <div className="container-fluid p-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                        <div>
                            <h2 className="fw-bold text-light mb-1">Product Catalog</h2>
                            <p className="text-muted mb-0">Total Products: <span className="text-primary fw-semibold">{totalElements}</span></p>
                        </div>
                        <button onClick={() => navigate('/add-product')} className="btn btn-primary bg-gradient rounded-3 d-flex align-items-center gap-2 px-4 py-2 shadow-sm">
                            <i className="bi bi-plus-circle-fill"></i>
                            Add Product
                        </button>
                    </div>

                    {/* Filter and Search Bar */}
                    <div className="card bg-dark border-secondary rounded-4 p-3 mb-4 shadow-sm">
                        <form onSubmit={handleSearchSubmit} className="row g-3 align-items-center">
                            <div className="col-12 col-md-5">
                                <div className="input-group">
                                    <span className="input-group-text bg-secondary text-light border-secondary">
                                        <i className="bi bi-search"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        className="form-control bg-dark text-white border-secondary focus-ring" 
                                        placeholder="Search products by name..." 
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div className="col-12 col-sm-6 col-md-3">
                                <select 
                                    className="form-select bg-dark text-white border-secondary focus-ring"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setPage(0);
                                    }}
                                >
                                    <option value="">All Categories</option>
                                    <option value="Mobiles">Mobiles</option>
                                    <option value="Laptops">Laptops</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Home">Home & Kitchen</option>
                                    <option value="Toys">Toys & Games</option>
                                </select>
                            </div>

                            <div className="col-12 col-sm-6 col-md-4 d-flex gap-2">
                                <button type="submit" className="btn btn-secondary bg-gradient px-4 py-2 flex-grow-1">
                                    Search
                                </button>
                                <button type="button" onClick={handleReset} className="btn btn-outline-secondary px-3 py-2">
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Product List Table */}
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center my-5 py-5">
                            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <ProductTable 
                                products={products} 
                                onView={handleView}
                                onEdit={handleEdit}
                                onDelete={handleDeleteClick}
                            />

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 gap-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="text-muted">Rows per page:</span>
                                        <select 
                                            className="form-select form-select-sm bg-dark text-white border-secondary focus-ring"
                                            style={{ width: '70px' }}
                                            value={pageSize}
                                            onChange={(e) => {
                                                setPageSize(Number(e.target.value));
                                                setPage(0);
                                            }}
                                        >
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                        </select>
                                    </div>

                                    <nav>
                                        <ul className="pagination pagination-sm bg-dark border-0 mb-0">
                                            <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                                                <button className="page-link bg-dark text-light border-secondary" onClick={() => setPage(page - 1)}>
                                                    Previous
                                                </button>
                                            </li>
                                            {[...Array(totalPages)].map((_, i) => (
                                                <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
                                                    <button className={`page-link border-secondary ${page === i ? 'bg-primary border-primary text-white' : 'bg-dark text-light'}`} onClick={() => setPage(i)}>
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}
                                            <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
                                                <button className="page-link bg-dark text-light border-secondary" onClick={() => setPage(page + 1)}>
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* View Product Modal */}
            {showViewModal && selectedProduct && (
                <div className="modal-backdrop-blur d-flex align-items-center justify-content-center position-fixed w-100 h-100 top-0 start-0" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <div className="card bg-dark border-secondary text-white rounded-4 shadow-lg p-4" style={{ maxWidth: '500px', width: '90%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary">
                            <h5 className="modal-title fw-bold text-gradient"><i className="bi bi-info-circle me-2 text-info"></i>Product Details</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={() => setShowViewModal(false)}></button>
                        </div>
                        
                        <div className="text-center mb-3">
                            {selectedProduct.imageUrl && selectedProduct.imageUrl !== 'product.jpg' ? (
                                <img 
                                    src={selectedProduct.imageUrl} 
                                    alt={selectedProduct.name} 
                                    className="img-fluid rounded-3 object-fit shadow border border-secondary"
                                    style={{ maxHeight: '280px', width: '100%' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/200x180?text=No+Image';
                                    }}
                                />
                            ) : (
                                <div className="rounded-3 bg-secondary bg-gradient d-flex align-items-center justify-content-center text-light shadow border border-secondary mx-auto" style={{ width: '150px', height: '150px' }}>
                                    <i className="bi bi-box-seam fs-1"></i>
                                </div>
                            )}
                        </div>

                        <div className="d-flex flex-column gap-2">
                            <div>
                                <small className="text-muted d-block">Product Name</small>
                                <span className="fs-5 fw-bold">{selectedProduct.name}</span>
                            </div>
                            <div>
                                <small className="text-muted d-block">Description</small>
                                <p className="mb-0 bg-secondary bg-opacity-25 rounded p-2 text-light" style={{ fontSize: '0.9rem' }}>
                                    {selectedProduct.description || 'No description provided.'}
                                </p>
                            </div>
                            <div className="row g-2">
                                <div className="col-6">
                                    <small className="text-muted d-block">Price</small>
                                    <span className="fw-bold text-success fs-6">{formatPrice(selectedProduct.price)}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Stock Available</small>
                                    <span className={`fw-bold fs-6 ${selectedProduct.stock <= 0 ? 'text-danger' : 'text-light'}`}>{selectedProduct.stock} units</span>
                                </div>
                            </div>
                            <div className="row g-2">
                                <div className="col-6">
                                    <small className="text-muted d-block">Category</small>
                                    <span className="badge bg-secondary border border-secondary mt-1">{selectedProduct.category}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Status</small>
                                    {selectedProduct.status ? (
                                        <span className="badge bg-success bg-opacity-25 text-success border border-success mt-1">Active</span>
                                    ) : (
                                        <span className="badge bg-danger bg-opacity-25 text-danger border border-danger mt-1">Inactive</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button type="button" className="btn btn-secondary px-4" onClick={() => setShowViewModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedProduct && (
                <div className="modal-backdrop-blur d-flex align-items-center justify-content-center position-fixed w-100 h-100 top-0 start-0" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <div className="card bg-dark border-danger text-white rounded-4 shadow-lg p-4" style={{ maxWidth: '400px', width: '90%' }}>
                        <div className="text-center mb-3">
                            <div className="bg-danger bg-opacity-10 text-danger rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                <i className="bi bi-exclamation-triangle-fill fs-2"></i>
                            </div>
                            <h5 className="fw-bold">Confirm Deletion</h5>
                            <p className="text-muted mb-0">Are you sure you want to delete this product?</p>
                            <p className="fw-semibold text-light mt-2 bg-secondary bg-opacity-25 p-2 rounded">{selectedProduct.name}</p>
                            <small className="text-danger d-block mt-1"><i className="bi bi-info-circle me-1"></i>This action cannot be undone.</small>
                        </div>

                        <div className="d-flex justify-content-center gap-2 mt-4">
                            <button type="button" className="btn btn-secondary px-4 py-2" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button type="button" className="btn btn-danger px-4 py-2" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
