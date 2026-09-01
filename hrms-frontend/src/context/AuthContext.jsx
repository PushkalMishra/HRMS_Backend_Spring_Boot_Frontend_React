import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Restore state from LocalStorage on reload
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (jwtResponse) => {
        // Deconstruct backend JwtResponse payload: { token, type, id, username, email, role }
        const { token: jwtToken, type, ...userData } = jwtResponse;

        // Persist session to LocalStorage
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user', JSON.stringify(userData));

        // Update React state
        setToken(jwtToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);