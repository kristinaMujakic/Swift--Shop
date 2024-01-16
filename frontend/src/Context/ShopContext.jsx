import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        const getDefaultCart = (products) => {
            let cart = {};
            for (let index = 0; index < products.length + 1; index++) {
                cart[index] = 0;
            }
            return cart;
        };

        const fetchData = async () => {
            try {
                const productsData = await axios.get('https://fakestoreapi.com/products');
                const categoriesData = await axios.get('https://fakestoreapi.com/products/categories');

                setProducts(productsData.data);
                setCategories(categoriesData.data);
                const defaultCart = getDefaultCart(productsData.data);
                setCartItems(defaultCart);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data from the store:', error.message);
            }
        };

        fetchData();
    }, []);

    const addToCart = (productId) => {
        setCartItems((prevCartItems) => {
            const newCartItems = { ...prevCartItems };
            newCartItems[productId] += 1;
            return newCartItems;
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevCartItems) => {
            const newCartItems = { ...prevCartItems };
            newCartItems[productId] -= 1;
            return newCartItems;
        });
    };

    const addTotalItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const addTotalAmount = () => {
        return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
            const product = products.find((p) => p.id === parseInt(productId));
            if (product) {
                return total + quantity * product.price;
            }
            return total;
        }, 0);
    };

    const contextValues = {
        products,
        categories,
        loading,
        cartItems,
        addToCart,
        removeFromCart,
        addTotalItems,
        addTotalAmount
    };

    return (
        <ShopContext.Provider value={contextValues}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
