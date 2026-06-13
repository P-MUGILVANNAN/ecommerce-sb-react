import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { addProduct } from '../services/productService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        imageUrl: '',
        status: true
    });
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        // Clear error as user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        
        const priceVal = parseFloat(formData.price);
        if (isNaN(priceVal)) {
            newErrors.price = 'Price is required';
        } else if (priceVal <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        const stockVal = parseInt(formData.stock);
        if (isNaN(stockVal)) {
            newErrors.stock = 'Stock is required';
        } else if (stockVal < 0) {
            newErrors.stock = 'Stock cannot be negative';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the errors in the form.');
            return;
        }

        setLoading(true);
        try {
            // Build request object
            const productPayload = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                status: formData.status === 'true' || formData.status === true
            };
            
            await addProduct(productPayload);
            toast.success('Product added successfully!');
            navigate('/products');
        } catch (error) {
            toast.error('Failed to add product: ' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex min-vh-100 bg-dark text-white">
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column" style={{ overflowX: 'hidden' }}>
                <Navbar />
                <div className="container-fluid p-4">
                    <div className="mb-4">
                        <h2 className="fw-bold text-light mb-1">Add Product</h2>
                        <p className="text-muted">Register a new retail product in the inventory catalog</p>
                    </div>

                    <div className="card bg-dark border-secondary rounded-4 shadow-sm max-w-lg mx-auto overflow-hidden">
                        <div className="card-header bg-secondary bg-opacity-25 border-bottom border-secondary py-3 px-4">
                            <h5 className="mb-0 fw-semibold text-gradient"><i className="bi bi-plus-circle me-2 text-primary"></i>Product Details Form</h5>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit} className="row g-3">
                                <div className="col-12">
                                    <label className="form-label fw-medium text-light">Product Name *</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        className={`form-control bg-dark text-white border-secondary focus-ring ${errors.name ? 'is-invalid border-danger' : ''}`}
                                        placeholder="e.g. iPhone 16"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-medium text-light">Description</label>
                                    <textarea 
                                        name="description"
                                        rows="3"
                                        className="form-control bg-dark text-white border-secondary focus-ring"
                                        placeholder="Enter product specifications or details..."
                                        value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-medium text-light">Category *</label>
                                    <select 
                                        name="category"
                                        className={`form-select bg-dark text-white border-secondary focus-ring ${errors.category ? 'is-invalid border-danger' : ''}`}
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Mobiles">Mobiles</option>
                                        <option value="Laptops">Laptops</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Home">Home & Kitchen</option>
                                        <option value="Toys">Toys & Games</option>
                                    </select>
                                    {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-medium text-light">Status *</label>
                                    <select 
                                        name="status"
                                        className="form-select bg-dark text-white border-secondary focus-ring"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-medium text-light">Price (INR) *</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-secondary border-secondary text-light">₹</span>
                                        <input 
                                            type="number" 
                                            name="price"
                                            step="0.01"
                                            className={`form-control bg-dark text-white border-secondary focus-ring ${errors.price ? 'is-invalid border-danger' : ''}`}
                                            placeholder="0.00"
                                            value={formData.price}
                                            onChange={handleChange}
                                        />
                                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-medium text-light">Stock Quantity *</label>
                                    <input 
                                        type="number" 
                                        name="stock"
                                        className={`form-control bg-dark text-white border-secondary focus-ring ${errors.stock ? 'is-invalid border-danger' : ''}`}
                                        placeholder="0"
                                        value={formData.stock}
                                        onChange={handleChange}
                                    />
                                    {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-medium text-light">Product Image URL</label>
                                    <input 
                                        type="text" 
                                        name="imageUrl"
                                        className="form-control bg-dark text-white border-secondary focus-ring"
                                        placeholder="https://example.com/product-image.jpg"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                    />
                                    <small className="text-muted d-block mt-1">Provide a URL link to a remote image file</small>
                                </div>

                                <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                                    <button 
                                        type="button" 
                                        onClick={() => navigate('/products')} 
                                        className="btn btn-outline-secondary px-4 py-2"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="btn btn-primary bg-gradient px-4 py-2 d-flex align-items-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Adding...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-circle"></i>
                                                Save Product
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
