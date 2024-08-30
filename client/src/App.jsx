// App.jsx
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Editor from './Pages/Editor';
import User from './Pages/User';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/editor' element={<Editor />} />
      <Route path='/user' element={<User />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
