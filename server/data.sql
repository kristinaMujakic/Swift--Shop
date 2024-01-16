-- Drop tables if they exist

DROP TABLE IF EXISTS users;

-- CREATE TABLE users (
--     email VARCHAR(255) PRIMARY KEY,
--     password VARCHAR(255) NOT NULL,
--     your_name VARCHAR(255) NOT NULL
-- );

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    your_name VARCHAR(255) NOT NULL,
    cart TEXT
);


CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    other_order_details TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
