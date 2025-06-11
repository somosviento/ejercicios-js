import React from 'react';
import './App.css';
import ProductGallery from './components/ProductGallery';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Gallery</h1>
      </header>
      <main>
        <ProductGallery />
      </main>
    </div>
  );
}

export default App;
