
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
    id INT(10) auto_increment NOT NULL,
    burger_name VARCHAR(100) NOT NULL,
    devoured BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);