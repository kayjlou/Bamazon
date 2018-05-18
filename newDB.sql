DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products (
  item_id INT(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT (100) NOT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Apple', 'Produce', .50, 200),
       ('Banana', 'Produce', 1.00, 200),
       ('Towels', 'Household', 6.99, 200),
       ('Orange juice', 'Produce', 2.99, 200),
       ('Kleenex', 'Household', 4.99, 200),
       ('Windex', 'Household', 5.25, 200),
       ('T-shirt', "Clothing", 10.99, 200),
       ('Running Shoes', 'Clothing', 50, 200),
       ("Peanut Butter", 'Food', 4, 200),
       ('Garbage Bags', "Household", 11, 200),
      




