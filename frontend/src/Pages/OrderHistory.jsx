import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import {jwtDecode} from 'jwt-decode';

export const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const { products } = useContext(ShopContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            // Redirect to login or show a message
            navigate('/login');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userID = decodedToken.id;
            fetchOrders(userID);
        } catch (error) {
            console.error('Error decoding token:', error);
            navigate('/login');
        }
    }, [navigate]);

    const fetchOrders = async (userID) => {
        try {
            const response = await fetch(`http://localhost:3001/orders/history/${userID}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setOrders(data.orderHistory);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    return (
        <div>
            <h1>Order History</h1>
            <div>
                {orders.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    orders.map(order => {
                        const productDetails = products.find(p => p.id === order.product_id);
                        if (!productDetails) return null;
                        return (
                            <div key={order.order_id} className="order-item">
                                <img width={100} src={productDetails.image} alt={productDetails.title} className='order-item-image' />
                                <div className="order-item-details">
                                    <p>{productDetails.title}</p>
                                    <p>Price: ${productDetails.price}</p>
                                    <p>Quantity: {order.quantity}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
