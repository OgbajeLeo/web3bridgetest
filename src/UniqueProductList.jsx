import React from 'react';

const UniqueProductList = ({
  uniqueProducts,
  uniqueCart,
  onAddToUniqueCart,
  onRemoveFromUniqueCart,
  onQuantityChange,
  error,
}) => {
    if (!Array.isArray(uniqueProducts)) {
      // Handle the case where Products is not an array (e.g., not yet fetched)
      return <div>Loading...</div>;
    }
  return (
    <div>
      <h2>Unique Product List</h2>
      {/* Display error message if any*/}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul className="product-list">
      {uniqueProducts.map((product) => (
        <li key={product.uniqueId} className="product-item">
          <div className="product-title">{product.title}</div>
          <div className="product-price">${product.price}</div>
          <div className="product-buttons">
            <button className="product-button" onClick={() => onAddToUniqueCart(product.uniqueId)}>
              Add to Cart
            </button>
            {uniqueCart[product.uniqueId] && (
              <div>
                <button
                  className="product-button"
                  onClick={() => onQuantityChange(product.uniqueId, uniqueCart[product.uniqueId] - 1)}
                >
                  -
                </button>
                {uniqueCart[product.uniqueId]}
                <button
                  className="product-button"
                  onClick={() => onQuantityChange(product.uniqueId, uniqueCart[product.uniqueId] + 1)}
                >
                  +
                </button>
                <button
                  className="product-button"
                  onClick={() => onRemoveFromUniqueCart(product.uniqueId)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default UniqueProductList;
