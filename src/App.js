import React from 'react';
// import logo from './logo.svg';
import './App.scss';

import WissWheel from "./wiss-wheel/WissWheel";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        What is Second Step (WISS) Interactive Component
      </header>
      <div className="app-container">
        <WissWheel />
      </div>
    </div>
  );
}

export default App;
