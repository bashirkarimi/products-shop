import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <div className="container m-auto px-6">
          <Header />
          <Routes>
            <Route path="/" exact element={<Products />} />
            <Route path="productDetails/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
