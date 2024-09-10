import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CreatSlice';
import './CartItem.css';

const Cart = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    // Initialize total to 0
    const total = cart.reduce((accumulator, item) => {
        const cost = parseFloat(item.cost.replace(/[^\d.-]/g, ''));
        const quantity = Number(item.quantity);

        return accumulator + cost * quantity;
    }, 0);

    return total.toFixed(2); // Return total formatted to 2 decimal places
};


  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevent default anchor tag behavior
    window.location.href = '#';
  };


  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));

    setAddedToCart(prevState => {
      const updatedState = { ...prevState };
      delete updatedState[item.name]; // Remove the item from state
      return updatedState;
    });
  };

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace(/[^\d.-]/g, ''));
    const quantity = Number(item.quantity);

    return (cost * quantity).toFixed(2);
};

  return (
    <div className="cart-container" id="cartList">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3 style={{ color: 'black' }}>Total Items in Cart: {totalQuantity}</h3>
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
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;


