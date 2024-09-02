import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider, { StoreContext } from './components/context/StoreContex.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />  
    </StoreContextProvider>

  </BrowserRouter>


)
