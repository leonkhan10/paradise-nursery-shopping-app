import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

// Placeholder thumbnails; replace the image URLs with your own plant photos if you like.
const img = (name) => `https://placehold.co/300x300/66bb6a/ffffff?text=${encodeURIComponent(name)}`;
const make = (name, cost, description) => ({ name, cost, description, image: img(name) });

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      make('Snake Plant', 15, 'Produces oxygen at night'),
      make('Spider Plant', 12, 'Filters formaldehyde and xylene'),
      make('Peace Lily', 18, 'Removes mold spores'),
      make('Boston Fern', 20, 'Adds humidity to the air'),
      make('Rubber Plant', 17, 'Absorbs airborne toxins'),
      make('Aloe Vera', 14, 'Purifies air and soothes burns'),
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      make('Lavender', 20, 'Calming scent that promotes sleep'),
      make('Jasmine', 18, 'Sweet fragrance, uplifts mood'),
      make('Rosemary', 15, 'Refreshing, boosts memory'),
      make('Mint', 12, 'Cooling aroma, great for tea'),
      make('Lemon Balm', 14, 'Citrusy scent that reduces stress'),
      make('Hyacinth', 22, 'Intense floral spring scent'),
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      make('Echeveria', 10, 'Rosette-shaped, drought tolerant'),
      make('Jade Plant', 13, 'Symbol of good luck'),
      make('Barrel Cactus', 16, 'Hardy, sun loving'),
      make('Zebra Haworthia', 11, 'Striped leaves, low light friendly'),
      make('String of Pearls', 19, 'Trailing bead-like foliage'),
      make('Burro\'s Tail', 17, 'Long trailing stems'),
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => dispatch(addItem(plant));

  return (
    <div>
      <div className="navbar">
        <span className="brand">Paradise Nursery</span>
        <div>
          <a onClick={onHomeClick}>Home</a>
          <a onClick={() => setShowCart(false)}>Plants</a>
          <a className="cart-link" onClick={() => setShowCart(true)} aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="32" width="32">
              <rect width="256" height="256" fill="none" />
              <circle cx="80" cy="216" r="12" fill="#fff" />
              <circle cx="184" cy="216" r="12" fill="#fff" />
              <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20" />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((group) => (
            <div key={group.category}>
              <div className="plantname_heading"><h2>{group.category}</h2></div>
              <div className="product-list">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div>{plant.description}</div>
                    <div className="product-price">${plant.cost}</div>
                    <button
                      className={`product-button ${isInCart(plant.name) ? 'added' : ''}`}
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
