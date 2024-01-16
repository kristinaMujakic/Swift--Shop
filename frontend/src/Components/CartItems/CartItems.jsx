import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './CartItems.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../../Extra/authUtils';
import { jwtDecode } from 'jwt-decode';


export const CartItems = () => {
    const navigate = useNavigate();  // useNavigate hook
    const { products, cartItems, removeFromCart, addTotalAmount } = useContext(ShopContext);

    const handleProceedToCheckout = async () => {
        const isValid = await validateToken();
        if (isValid) {
            try {

                const token = localStorage.getItem('auth-token');
                if (!token) {
                    throw new Error("No token found");
                }

                // Decode the token to get the user ID
                const decodedToken = jwtDecode(token);
                const userID = decodedToken.id;

                console.log("User ID:", userID);
                console.log("decodedToken:", decodedToken);


                const orderData = {
                    userID: userID,
                    products: Object.keys(cartItems).map(key => ({
                        productId: key,
                        quantity: cartItems[key]
                    }))
                };

                console.log(orderData);
                const response = await fetch('http://localhost:3001/orders/place', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    },
                    body: JSON.stringify(orderData)
                });



                const responseData = await response.json();

                console.log(responseData);
                if (responseData.success) {
                    alert("Order processed successfully!");
                    // Additional logic on successful order
                } else {
                    alert(responseData.message);


                    console.error(
                        "Order error: Couldn't order"
                    );

                }
            } catch (error) {
                console.error('Error processing order:', error);

                alert("Error processing order");
            }
        } else {
            navigate('/login');
        }
    };


    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {products.map((p) => {
                if (cartItems[p.id] > 0) {
                    return (
                        <div key={p.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={p.image} alt="" className='carticon-product-icon' />
                                <p>{p.title}</p>
                                <p>${p.price}</p>
                                <button className='cartitems-quantity'>{cartItems[p.id]}</button>
                                <p>${p.price * cartItems[p.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(p.id); }} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${addTotalAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${addTotalAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={() => handleProceedToCheckout()}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
