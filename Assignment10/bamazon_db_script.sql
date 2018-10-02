CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT(11) auto_increment NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(25) NOT NULL,
price INT(10) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('River Boat', 'Recreation', 19995, 3), ('Pieces of 8', 'Toys', 10, 27), ('Pillows', 'Decor', 14.95, 19), ('Legos TM', 'Toys', 29.95, 11), ('Lemon Juice', 'Grocery', 4.97, 35), ('Shot Glass', 'Home', 7.99, 8), ('Tennis Racket', 'Sport', 48.75, 12), ('Pants', 'Clothing', 99.45, 17), ('Xbox TM', 'Electronics', 274.95, 9), ('Yoga Mats', 'Fitness', 19.99, 14);