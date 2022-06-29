import React from "react";
import {BrowserRouter} from 'react-router-dom'
import AppRouter from "./components/AppRouter/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import './scss/index.scss'

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navbar />
        <AppRouter />
        <Sidebar />
      </BrowserRouter>
    </div>
  );
}

export default App;
