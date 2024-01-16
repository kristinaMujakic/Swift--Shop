# Capstone 2 Project Proposal

## Swift Shop - E-Commerce Platform

### 1. Tech Stack
- **Front End:** React.js, HTML, CSS, Bootstrap, Reactstrap
- **Back End:** Node.js, Express, PostgreSQL

### 2. Focus
 - The project will be a full-stack application, emphasizing both the front-end user interface and the back-end functionality.

### 3. Platform
 - The platform will be a web-based application accessible through standard web browsers. A web application is chosen for its wide accessibility across various devices.

### 4. Project Goal
 - Create "Swift Shop," an e-commerce platform that prioritizes a modern, efficient, and user-friendly shopping experience.

### 5. User Demographic
 - The target audience includes online shoppers of various backgrounds. The platform will cater to both experienced users and those new to online shopping.

### 6. Data Usage
 - Utilize product data from the FakeStoreAPI, encompassing categories such as electronics, jewelry, men's clothing, and women's clothing.

### 7. Project Approach
 - a. Database Schema: Rely primarily on the external API for product data, with a schema for user data and order history.

 - 1. **User Data:**
   - user_id (Primary Key)
   - username
   - email
   - password (hashed)
   
 - 2. **Order History:**
   - order_id (Primary Key)
   - user_id (Foreign Key)
   - product_id (Foreign Key)
   - quantity
   - other_order_details

 - b. API Challenges: Address potential challenges like rate limiting and data inconsistencies with robust error handling.

 - c. Security Measures: Implement JSON Web Tokens (JWT) for user authentication, employing bcrypt for password hashing.

 - d. Functionality: Core features include product listing, detailed product views, shopping cart management, and order processing. Implement user authentication and authorization for an enhanced shopping experience.

 - e. User Flow: Users start on the homepage, browse products, view details, add items to the cart, and proceed to checkout.
    - 1. **User Registration:** User details are stored in the User Data table upon registration.

    - 2. **Product Listing and Display:** Product information is fetched in real-time from the external FakeStoreAPI.

    - 3. **Adding Items to Cart:** Cart details are stored in the Order History table when users add items.

    - 4. **Checkout and Order Placement:** Orders are recorded in the Order History table upon checkout.

 - f. Features and Stretch Goals: user account management, wishlists, previous orders.
