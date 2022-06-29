import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import DeviceStore from './store/DeviceStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
function Main() {
  const [oneDevice, setOneDevice] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [isCartMenuVisible, setIsCartMenuVisible] = useState(false);

  return(
    <React.StrictMode>
      <AuthContextProvider>
        <Context.Provider value={{
          device: new DeviceStore(),
          oneDevice, setOneDevice,
          loading, setLoading,
          cart, setCart,
          isCartMenuVisible, setIsCartMenuVisible
        }}>
          <App />
        </Context.Provider>
      </AuthContextProvider>
    </React.StrictMode>
  )
}


root.render(
  <Main />
);


