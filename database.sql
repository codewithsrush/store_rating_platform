CREATE DATABASE store_rating_platform;
USE store_rating_platform;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(400),
    role ENUM('admin','user','owner') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    address VARCHAR(400),
    owner_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    store_id INT,
    rating INT CHECK(rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(user_id, store_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(store_id) REFERENCES stores(id)
);

INSERT INTO users(name,email,password,address,role)
VALUES(
'System Administrator',
'admin@gmail.com',
'Admin@123',
'Pune',
'admin'
);

UPDATE users
SET password='$2b$10$AJDbtBU39ahLxOHVsVGCv.GL9.qq/Dei2u6FxZYXR9IIxf41eDuY2'
WHERE email='admin@gmail.com;

SELECT * FROM users;

INSERT INTO users (name, email, password, role)
VALUES
('Rahul Sharma', 'rahul@gmail.com', '$2b$10$AJDbTbU39ahLxOhVsVGCv.GL9.qq/Dei2u6FxZYXR9IIxf', 'owner'),
('Priya Patil', 'priya@gmail.com', '$2b$10$AJDbTbU39ahLxOhVsVGCv.GL9.qq/Dei2u6FxZYXR9IIxf', 'owner'),
('Amit Joshi', 'amit@gmail.com', '$2b$10$AJDbTbU39ahLxOhVsVGCv.GL9.qq/Dei2u6FxZYXR9IIxf', 'user'),
('Sneha Kulkarni', 'sneha@gmail.com', '$2b$10$AJDbTbU39ahLxOhVsVGCv.GL9.qq/Dei2u6FxZYXR9IIxf', 'owner'),
('Rohan Deshmukh', 'rohan@gmail.com', '$2b$10$AJDbTbU39ahLxOhVsVGCv.GL9.qq/Dei2u6FxZYXR9IIxf', 'user');

INSERT INTO stores (name, email, address, owner_id)
VALUES
('Fresh Mart', 'freshmart@gmail.com', 'Pune', 3),
('City Super Store', 'citystore@gmail.com', 'Mumbai', 4),
('Daily Needs', 'dailyneeds@gmail.com', 'Nashik', 6),
('Mega Bazaar', 'megabazaar@gmail.com', 'Nagpur', 3),
('Green Grocery', 'greengrocery@gmail.com', 'Aurangabad', 4);

SELECT * FROM stores;

INSERT INTO ratings (user_id, store_id, rating)
VALUES
(2,1,5),
(5,2,4),
(7,3,3),
(2,4,5),
(5,5,4);

DESCRIBE stores;