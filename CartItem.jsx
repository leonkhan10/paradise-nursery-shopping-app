import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemTotal = (item) => item.cost * item.quantity;
  const calculateTotalAmount = () => cart.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    else dispatch(removeItem(item.name));
  };

  const handleRemove = (item) => dispatch(removeItem(item.name));
  const handleCheckoutShopping = () => alert('Coming Soon');

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h2 className="total_cart_amount">Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <div className="product-title">{item.name}</div>
            <div>Unit price: ${item.cost.toFixed(2)}</div>
            <div className="cart-item-quantity">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <div className="cart-item-total">Total: ${itemTotal(item).toFixed(2)}</div>
          </div>
          <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
        </div>
      ))}
      <div className="cart-actions">
        <button className="continue-button" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="checkout-button" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
