DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee_role (
    role_id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(12,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(role_id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES employee_role(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee_role(role_id)
);
