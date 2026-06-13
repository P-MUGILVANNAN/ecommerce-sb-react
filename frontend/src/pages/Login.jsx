import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginAdmin } from '../services/authService';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            const data = await loginAdmin(email, password);
            login(data.email, data.token);
            toast.success('Login successful! Welcome back.');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container min-vh-100 d-flex align-items-center justify-content-center bg-dark p-3">
            <div className="login-card glass-panel p-5 rounded-4 shadow-lg text-white border border-secondary" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="text-center mb-4">
                    <div className="logo-box bg-gradient rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3 shadow" style={{ width: '70px', height: '70px' }}>
                        <i className="bi bi-shield-lock fs-2 text-white"></i>
                    </div>
                    <h3 className="fw-bold tracking-wide">Admin</h3>
                    <p className="text-light">Sign in to manage your e-commerce platform</p>
                </div>

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <div>
                        <label className="form-label text-light fw-medium">Email Address</label>
                        <div className="input-group">
                            <span className="input-group-text bg-secondary text-light border-secondary">
                                <i className="bi bi-envelope-fill"></i>
                            </span>
                            <input 
                                type="email" 
                                className="form-control bg-dark text-white border-secondary focus-ring" 
                                placeholder="admin@gmail.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label text-light fw-medium">Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-secondary text-light border-secondary">
                                <i className="bi bi-lock-fill"></i>
                            </span>
                            <input 
                                type="password" 
                                className="form-control bg-dark text-white border-secondary focus-ring" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn btn-primary bg-gradient py-2.5 rounded-3 fw-semibold mt-3 transition d-flex align-items-center justify-content-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Authenticating...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-box-arrow-in-right"></i>
                                Log In
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
