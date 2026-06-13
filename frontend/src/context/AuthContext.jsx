import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(localStorage.getItem('adminEmail') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedEmail = localStorage.getItem('adminEmail');
        if (storedToken && storedEmail) {
            setToken(storedToken);
            setUser(storedEmail);
        }
        setLoading(false);
    }, []);

    const login = (email, jwtToken) => {
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('adminEmail', email);
        setToken(jwtToken);
        setUser(email);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminEmail');
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
