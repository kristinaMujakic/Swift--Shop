import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './ProductDisplay.css';

export const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);

    if (!product) {
        return <div>No product data available.</div>;
    }

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    {product.image && <img className='productdisplay-main-img' src={product.image} alt="" />}
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <div className="productdisplay-right-price">
                    ${product.price}
                </div>
                <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
            </div>
        </div>
    );
};
