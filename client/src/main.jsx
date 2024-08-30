import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Pages/AuthsContext.jsx';
import { Provider } from 'react-redux';
import textStore from './Redux/textStore.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={textStore}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
