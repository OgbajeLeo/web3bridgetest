import React, { useState, useEffect } from 'react';
import UniqueProductList from './UniqueProductList';
import './App.css';

const ShoppingCart = () => {
  const [uniqueCart, setUniqueCart] = useState({});
  const [discountCode, setDiscountCode] = useState('');
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleAddToUniqueCart = (productId) => {
    setUniqueCart((prevUniqueCart) => ({
      ...prevUniqueCart,
      [productId]: (prevUniqueCart[productId] || 0) + 1,
    }));
  };

  const handleRemoveFromUniqueCart = (productId) => {
    setUniqueCart((prevUniqueCart) => {
      const newUniqueCart = { ...prevUniqueCart };
      delete newUniqueCart[productId];
      return newUniqueCart;
    });
  };

  const handleQuantityChange = (productId, quantity) => {
    setUniqueCart((prevUniqueCart) => ({
      ...prevUniqueCart,
      [productId]: quantity,
    }));
  };

  const handleApplyDiscountCode = () => {
    if (discountCode === 'UNIQUEWEB3COHORTx') {
      // Apply 10% discount
      alert('Discount code applied! 10% discount has been added.');
    } else {
      alert('Invalid discount code');
    }
  };

  const getTotalPrice = () => {
    return Object.keys(uniqueCart).reduce((total, productId) => {
      const product = uniqueProducts.find((p) => p.uniqueId === productId);
      if (product) {
        return total + product.price * uniqueCart[productId];
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    // Fetch product data
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .then((data) => {
        setUniqueProducts(data);
      })
      .catch((fetchError) => {
        setError(fetchError.message);
      });
  }, []); // Only run on mount

  useEffect(() => {
    // Load cart data from localStorage on component mount
    const savedUniqueCart = localStorage.getItem('uniqueCart');
    if (savedUniqueCart) {
      setUniqueCart(JSON.parse(savedUniqueCart));
    }
  }, []);

  useEffect(() => {
    // Save cart data to localStorage whenever it changes
    localStorage.setItem('uniqueCart', JSON.stringify(uniqueCart));
  }, [uniqueCart]);

  return (
    <>
      <h1>Unique Shopping Cart</h1>
      {/* Pass the error state to UniqueProductList */}
      <UniqueProductList
        uniqueProducts={uniqueProducts}
        uniqueCart={uniqueCart}
        onAddToUniqueCart={handleAddToUniqueCart}
        onRemoveFromUniqueCart={handleRemoveFromUniqueCart}
        onQuantityChange={handleQuantityChange}
        error={error}
      />
          
      <div className="discount-section">
        <input
          type="text"
          placeholder="Enter discount code"
          className="discount-input"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button className="discount-button" onClick={handleApplyDiscountCode}>
          Apply Discount Code
        </button>
      </div>
      <div className="total-section">
        <h2 className="total-price">Total Price: ${getTotalPrice()}</h2>
      </div>
    </>
  );
};

export default ShoppingCart;
