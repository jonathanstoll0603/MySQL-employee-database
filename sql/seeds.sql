-- seeds for departments
INSERT INTO department (dept_name) 
VALUES ('Quality Assurance');
INSERT INTO department (dept_name) 
VALUES ('Operations');
INSERT INTO department (dept_name) 
VALUES ('Sales');
INSERT INTO department (dept_name) 
VALUES ('Manufacturing');

-- seeds for quality assurance roles
INSERT INTO employee_role (title, salary, department_id)
VALUES ('Quality Assurance Manager', 100000, 1);
INSERT INTO employee_role (title, salary, department_id)
VALUES ('Quality Assurance Specialist', 75000, 1);

-- seeds for operations roles 
INSERT INTO employee_role (title, salary, department_id)
VALUES ('Operations Manager', 150000, 2);
INSERT INTO employee_role (title, salary, department_id)
VALUES ('Operations Specialist', 100000, 2);

-- seeds for sales roles
INSERT INTO employee_role (title, salary, department_id)
VALUES ('Sales Manager', 120000, 3);
INSERT INTO employee_role (title, salary, department_id)
VALUES ('Product Sales', 65000, 3);

-- seeds for manufacturing roles
INSERT INTO employee_role (title, salary, department_id)
VALUES ('Manufacturing Manager', 120000, 4);
INSERT INTO employee_role (title, salary, department_id)
VALUES ('Manufacturing Technician', 50000, 4);