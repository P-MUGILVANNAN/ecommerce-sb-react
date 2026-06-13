import React from 'react';

const ProductTable = ({ products, onView, onEdit, onDelete }) => {
    
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(price);
    };

    const getImageUrl = (url) => {
        if (!url || url.trim() === '' || url === 'product.jpg') {
            return null; // display fallback
        }
        return url;
    };

    return (
        <div className="table-responsive rounded-4 shadow-sm border border-secondary bg-dark text-white">
            <table className="table table-dark table-hover mb-0 align-middle">
                <thead className="table-dark-header border-bottom border-secondary">
                    <tr>
                        <th className="py-3 px-4" style={{ width: '80px' }}>Image</th>
                        <th className="py-3">Product Name</th>
                        <th className="py-3">Category</th>
                        <th className="py-3 text-end">Price</th>
                        <th className="py-3 text-center" style={{ width: '100px' }}>Stock</th>
                        <th className="py-3 text-center" style={{ width: '120px' }}>Status</th>
                        <th className="py-3 text-center" style={{ width: '180px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id} className="border-bottom border-secondary transition-row">
                                <td className="px-4 py-3">
                                    {getImageUrl(product.imageUrl) ? (
                                        <img 
                                            src={product.imageUrl} 
                                            alt={product.name} 
                                            className="rounded-3 object-fit-cover shadow-sm border border-secondary"
                                            style={{ width: '50px', height: '50px' }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://placehold.co/100x100?text=No+Image';
                                            }}
                                        />
                                    ) : (
                                        <div className="rounded-3 bg-secondary bg-gradient d-flex align-items-center justify-content-center text-light shadow-sm border border-secondary" style={{ width: '50px', height: '50px' }}>
                                            <i className="bi bi-image fs-4"></i>
                                        </div>
                                    )}
                                </td>
                                <td className="py-3 fw-semibold text-light">{product.name}</td>
                                <td className="py-3"><span className="badge bg-secondary bg-opacity-50 text-light border border-secondary px-2 py-1.5">{product.category}</span></td>
                                <td className="py-3 text-end fw-bold text-success">{formatPrice(product.price)}</td>
                                <td className="py-3 text-center">
                                    <span className={`fw-semibold ${product.stock <= 0 ? 'text-danger' : product.stock < 10 ? 'text-warning' : 'text-light'}`}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="py-3 text-center">
                                    {product.status ? (
                                        <span className="badge bg-success bg-opacity-25 text-success border border-success px-2.5 py-1.5 rounded-pill">
                                            <i className="bi bi-check-circle-fill me-1"></i> Active
                                        </span>
                                    ) : (
                                        <span className="badge bg-danger bg-opacity-25 text-danger border border-danger px-2.5 py-1.5 rounded-pill">
                                            <i className="bi bi-x-circle-fill me-1"></i> Inactive
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 text-center">
                                    <div className="d-flex justify-content-center gap-2">
                                        <button 
                                            onClick={() => onView(product)} 
                                            className="btn btn-outline-info btn-sm rounded-circle d-flex align-items-center justify-content-center p-2"
                                            title="View Details"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="bi bi-eye-fill"></i>
                                        </button>
                                        <button 
                                            onClick={() => onEdit(product)} 
                                            className="btn btn-outline-warning btn-sm rounded-circle d-flex align-items-center justify-content-center p-2"
                                            title="Edit Product"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>
                                        <button 
                                            onClick={() => onDelete(product)} 
                                            className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center p-2"
                                            title="Delete Product"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="bi bi-trash3-fill"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-5 text-muted">
                                <i className="bi bi-box-seam fs-1 d-block mb-3"></i>
                                No products found matching criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
