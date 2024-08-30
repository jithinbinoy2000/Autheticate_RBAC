import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthsContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    const sessionRole = sessionStorage.getItem('role');
    setToken(sessionToken || '');
    setRole(sessionRole || '');
  }, []);

  useEffect(() => {
    if (token && role) {
      console.log("checking token ");
      
      if (role === 'admin') navigate('/admin');
      else if (role === 'editor') navigate('/editor');
      else if (role === 'user') navigate('/user');
      else navigate('/');
    } else {
      navigate("/ ");
    }
  }, [token, role, navigate]);

  return (
    <AuthsContext.Provider value={{ token, role, setToken, setRole }}>
      {children}
    </AuthsContext.Provider>
  );
};

export const useAuth = () => useContext(AuthsContext);
