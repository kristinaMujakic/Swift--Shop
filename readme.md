# Swift Shop - E-Commerce Platform

## Overview

Welcome to Swift Shop, an e-commerce platform that prioritizes a modern, efficient, and user-friendly shopping experience. This document provides a brief overview of the backend, frontend, database schema, and routes of the Swift Shop project.

## Backend

The backend of Swift Shop is built using Node.js and Express, with PostgreSQL as the database. It is responsible for handling user authentication, managing user information, processing orders, and handling favorites.

### Routes

- **User Routes:** Responsible for user authentication, registration, and profile management.
  - `/api/users/register` - User registration.
  - `/api/users/login` - User login.
  - `/api/users/profile/:username` - Fetch user profile.
  - `/api/users/update/:username` - Update user profile.

- **Product Routes:** Interact with the external API (FakeStoreAPI) to fetch product data.
  - `/api/products` - Fetch all products.
  - `/api/products/:id` - Fetch a specific product.

- **Order Routes:** Manage user orders.
  - `/api/orders/place` - Place a new order.
  - `/api/orders/history/:username` - Fetch user's order history.

- **Favorite Routes:** Manage user favorites.
  - `/api/favorites/add` - Add a product to user's favorites.
  - `/api/favorites/list/:username` - Fetch user's favorite products.

## Frontend

The frontend of Swift Shop is developed using React.js, HTML, CSS, Bootstrap, and Reactstrap. It provides a seamless and intuitive user interface for browsing products, managing the shopping cart, and placing orders.

### Components

- **ProductsList:** Displays a list of all products.
- **ProductCard:** Represents a single product.
- **Categories:** Displays a list of product categories.
- **ShoppingBasket:** Manages items added to the shopping basket.
- **UserDetails:** Displays user details.
- **Favourites:** Displays a list of user's favorite products.

### Routes

- `/` - Homepage with product listings.
- `/login` - User login page.
- `/register` - User registration page.
- `/profile` - User profile page.
- `/basket` - Shopping basket page.
- `/favorites` - User favorites page.
- `/orders` - User order history page.

## Database Schema

The database schema is designed to efficiently store user data, order history, and favorites.

### User Data Table:

- `user_id` (Primary Key)
- `username`
- `email`
- `password` (hashed)

### Order History Table:

- `order_id` (Primary Key)
- `user_id` (Foreign Key)
- `product_id` (Foreign Key)
- `quantity`
- `other_order_details`

### Favorites Table:

- `favorite_id` (Primary Key)
- `user_id` (Foreign Key)
- `product_id` (Foreign Key)
