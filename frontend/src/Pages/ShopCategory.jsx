import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Item } from '../Components/Items/Item';
import './CSS/ShopCategory.css';

export const ShopCategory = (props) => {
    const { products } = useContext(ShopContext);

    return (
        <div>
            <div className="shop-category">
                <img className="shopcategory-banner" src={props.banner} alt="" />
            </div>
            <div className="shopcategory-products">
                {products.map((item, i) => {
                    if (props.category === item.category) {
                        return (
                            <Item
                                key={i}
                                id={item.id}
                                name={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                rating={item.rating}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};
