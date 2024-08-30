import { useState } from 'react';
import { LoginApi } from '../Services/API';
import { useAuth } from './AuthsContext';
import '../Styles/login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setRole } = useAuth();

  const handleSubmit = async () => {
    if (!username || !password) {
      console.log('empty data');
      alert("Please Fill The Form Completely")
      return;
    }

    try {
      const result = await LoginApi(username, password);

      if (result.request.status === 200) {
        const { role, token } = result.data;
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('token', token);
        setToken(token);
        setRole(role);
      } else {
        alert("invalid Credentials")
        console.warn(result.response.data || result.response.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div style={{width:"100vw",height:"100vh", display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div className='login-container'>
        <h2 style={{fontFamily:'monospace'}}>Login</h2>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        className='login-input'
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
         className='login-input'
      />
      <button onClick={handleSubmit}
      className='login-button'>Login</button>
      </div>
    </div>
  );
}

export default Login;
