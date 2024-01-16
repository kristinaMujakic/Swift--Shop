import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            throw new Error("No token found");
        }

    // Decode the token to get the user ID
        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;

        console.log(username)

        fetch(`/favorites/list/${username}`)
            .then(response => response.json())
            .then(data => setFavorites(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            {favorites.length > 0 ? (
                <ul>
                    {favorites.map(product => (
                        <li key={product.id}>{product.name} - {product.description}</li>
                    ))}
                </ul>
            ) : (
                <p>No favorite products found.</p>
            )}
        </div>
    );
};

export default Favorites;
