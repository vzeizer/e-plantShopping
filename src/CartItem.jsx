import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Remove the '$' and convert to number
      const price = parseFloat(item.cost.replace('$', ''));
      // Multiply by quantity if it exists, otherwise just add the price
      const itemTotal = item.quantity ? price * item.quantity : price;
      return total + itemTotal;
    }, 0).toFixed(2); // Round to 2 decimal places
  
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
    };

  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevent default behavior of the event
    onContinueShopping(); // Call the function passed from parent component
   
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({
        ...item,
        quantity: (item.quantity || 1) + 1  // If quantity doesn't exist, assume it's 1
    }));
    };

  const handleDecrement = (item) => {
    if ((item.quantity || 1) <= 1) {
      // If quantity is 1 or less, remove the item
      dispatch(removeItem(item));
  } else {
      // Otherwise decrement the quantity
      dispatch(updateQuantity({
          ...item,
          quantity: item.quantity - 1
      }));
  }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Remove '$' and convert to number
    const unitCost = parseFloat(item.cost.replace('$', ''));
    // Multiply by quantity (default to 1 if quantity doesn't exist)
    const totalCost = unitCost * (item.quantity || 1);
    // Return formatted price with 2 decimal places and '$' symbol
    return `$${totalCost.toFixed(2)}`;
    };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>

        {/* Quantity controls */}
        <div className="quantity-controls">
        <button onClick={() => handleDecrement(item)}>-</button>
        <span>{item.quantity || 1}</span>
        <button onClick={() => handleIncrement(item)}>+</button>
        </div>
        
        {/* Subtotal for this item */}
        <div className="subtotal">
          Subtotal: {calculateTotalCost(item)}
        </div>
        
        {/* Remove button */}
        <button 
          className="cart-item-delete"
          onClick={() => handleRemove(item)}
        >
          Remove
        </button>
          
          </div>
          
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


