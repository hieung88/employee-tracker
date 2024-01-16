DROP DATABASE IF EXISTS employees_db;

-- create new database named employee_db --

CREATE DATABASE employees_db;

USE employees_db;

-- create department table --

CREATE TABLE department (
    id INT NOT NULL auto_increment PRIMARY KEY,
    department_name VARCHAR(50)
);


-- create roles table --

CREATE TABLE role (
    id INT NOT NULL auto_increment PRIMARY KEY,
    title VARCHAR(50),
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);


-- create employee table

CREATE TABLE employee (
    id INT NOT NULL auto_increment PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
 


