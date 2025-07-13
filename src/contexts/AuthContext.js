import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
 
console.log('✅ [FETCH USER] Token in localStorage:', token);

      if (!token) throw new Error('No token found');

      const res = await axios.get('/users/me', {
        
        headers: {
          
          Authorization: `Bearer ${token}`,
          
        },
        
      });
      console.log('✅ [FETCH USER] Calling /users/me with Authorization header:', `Bearer ${token}`);

    
      setUser(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
      }
      console.error('Auto-login failed:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials) => {
    const res = await axios.post('/users/login', credentials);
      console.log('✅ [LOGIN FUNCTION] Received token from server:', res.data.token);

    localStorage.setItem('token', res.data.token);
    await fetchUser();
  };

  const logout = () => {
    return new Promise((resolve) => {
      localStorage.removeItem('token');
      setUser(null);
      resolve();
    });
  };
return (
  <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
    {children}
  </AuthContext.Provider>
);

}

export const useAuth = () => useContext(AuthContext);
