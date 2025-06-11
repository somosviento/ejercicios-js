import React from 'react';
import './App.css';
import Header from './components/Header';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ProductPage />
      </main>
    </div>
  );
}

export default App;
