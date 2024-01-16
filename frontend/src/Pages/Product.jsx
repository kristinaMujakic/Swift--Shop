import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import { Breadcrum } from '../Components/Breadcrum/Breadcrum';
import { ProductDisplay } from '../Components/ProductDetails/ProductDisplay';


export const Product = () => {
    const { products } = useContext(ShopContext);
    const { productId } = useParams();
    const product = products.find((p) => p.id === Number(productId));

    return (
        <div>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
        </div>
    );
};
