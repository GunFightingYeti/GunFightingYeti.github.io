CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT(11) auto_increment NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(25) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('River Boat', 'Recreation', 19995, 327), ('Water Bottle', 'Fitness', 12.49, 6300), ('Pillows', 'Decor', 14.95, 4350), ('Lego', 'Toys', 29.95, 2110), ('Lemon & Cayenne', 'Grocery', 4.97, 6250), ('Shot Glass', 'Home', 7.99, 2630), ('Tennis Racket', 'Sport', 48.75, 2800), ('Winter Coat', 'Clothing', 99.45, 6490), ('Xbox', 'Electronics', 274.95, 587), ('Yoga Mat', 'Fitness', 19.99, 6278);

SELECT * FROM products;