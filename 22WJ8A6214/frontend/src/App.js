import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(setProducts);

    fetch('http://localhost:5000/api/cart')
      .then(res => res.json())
      .then(setCart);
  }, []);

  const addToCart = async (productId) => {
    await fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    const res = await fetch('http://localhost:5000/api/cart');
    setCart(await res.json());
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ${p.price}
            <button onClick={() => addToCart(p._id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <h2>Cart</h2>
      <ul>
        {cart.map(c => (
          <li key={c._id}>
            Product: {c.productId}, Quantity: {c.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;