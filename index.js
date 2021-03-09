const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// sql database object
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1014508j',
    database: 'employee_tracker_db'
});

// establish connection to sql database 
connection.connect((err) => {
    if (err) throw err;

    console.log(`Connection established via thread #: ${connection.threadId}.`);
    
    // start the application once connection established
    loadApp();
})

// function that loads the application upon running node js
const loadApp = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choices',
            choices: [
                'View all employees', 
                'View all departments', 
                'View all roles', 
                'Add department', 
                'Add role', 
                'Add employee', 
                'Update employee role', 
                'Quit']
        }
    ]).then((answer) => {        
        // switch statement that calls new function based on user answer to previous prompt
        switch(answer.choices) {
            case 'Quit':
                connection.end();
                break;
            
            case 'View all employees':
                viewAllEmployees();
                break;
            
            case 'View all departments':
                viewAllDepts();
                break;

            case 'View all roles':
                viewAllRoles();
                break;

            case 'Add department':
                addDept();
                break;
            
            case 'Add Role':
                addRole();
                break;
        
            case 'Add employee':
                addEmployee();
                break;

            case 'Update employee role':
                updateEmployeeRole();
                break;
        }
    }).catch(err => {console.error(err)});
}

const viewAllEmployees = () => {
    const query = `SELECT * FROM employee`;
    connection.query(query, (err, data) => {
        if (err) throw err;

        let employeesArr = [];
        // loops through each employee and outputs their information
        data.forEach(({ first_name, last_name, role_id, manager_id }) => {
               let employees = [first_name, last_name, role_id, manager_id];
               employeesArr.push(employees);
        });
        // Prints the results to the console
        console.table(['First Name', 'Last Name', 'Role Id', 'Manager ID'], employeesArr);

        // Reruns loadApp function
        return loadApp();
        
    });   
};

const viewAllDepts = () => {
    const query = `SELECT * FROM department`;
    connection.query(query, (err, data) => {
        if (err) throw err;

        let deptsArr = [];
        // loops through each department and outputs their information
        data.forEach(({ dept_name }) => {
               let depts = [dept_name];
               deptsArr.push(depts);
        });
        // Prints the results to the console
        console.log('\n');
        console.table(['Department Name'], deptsArr);
        console.log('\n');

        // Reruns loadApp function
        return loadApp();
    });   
};

const viewAllRoles = () => {
    const query = `SELECT * FROM employee_role`;
    connection.query(query, (err, data) => {
        if (err) throw err;

        let rolesArr = [];
        // loops through each role and outputs the information
        data.forEach(({ title, salary, department_id }) => {
               let roles = [title, salary, department_id];
               rolesArr.push(roles);
        });
        // Prints the results to the console
        console.log('\n');
        console.table(['Title', 'Salary', 'Department Id'], rolesArr);
        console.log('\n');

        // Reruns loadApp function
        return loadApp();
    });   
};

const addDept = () => {
    query = 'SELECT * FROM department';
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.log(data.dept_name);

        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the new department you would like to add?',
                name: 'newDept'
            }
        ]).then((answer) => {

            queryInsert = 'INSERT INTO department SET ?';
            connection.query(queryInsert, 
                {
                    dept_name: answer.newDept
                }, 
                err => {
                if (err) throw err;
                
                console.log(`${answer.newDept} successfully added to database.`);
            });
        }).catch(err => console.error(err));
    });
};

const addRole = () => {
    query = 'SELECT * FROM employee_role';
    connection.query(query, (err, data) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the title of the new role you would like to add?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the salary of new role?',
                name: 'salary',
                validate: (answer) => {
                    valid = /^[0-9]+$/.test(answer)
                    if (!valid) {
                        return console.log(" *Input must be a number. Try again.*")
                    }
                    return true;
                }
            },
            {
                type: 'input',
                message: 'What is the department ID of the new role?',
                name: 'deptID',
                validate: (answer) => {
                    valid = /^[0-9]+$/.test(answer)
                    if (!valid) {
                        return console.log(" *Input must be a number. Try again.*")
                    }
                    return true;
                }
            }
        ]).then((answer) => {

            queryInsert = 'INSERT INTO employee_role SET ?';
            connection.query(queryInsert, 
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.deptID
                }, 
                err => {
                if (err) throw err;
                
                console.log(`Title: ${answer.title}, with a salary of: ${answer.salary}$, and a department ID of: ${answer.deptID} successfully added to database.`);
            });
        });
    })
};

const addEmployee = () => {
    query = 'SELECT * FROM employee';
    connection.query(query, (err, data) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the first name of the new employee you would like to add?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'What is the last name of the new employee you would like to add?',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'What is the role ID of new employee?',
                name: 'roleID',
                validate: (answer) => {
                    valid = /^[0-9]+$/.test(answer)
                    if (!valid) {
                        return console.log(" *Input must be a number. Try again.*")
                    }
                    return true;
                }
            },
            {
                type: 'input',
                message: 'What is the manager ID of the new role? If the employee does not have a manager, please leave blank and press enter.',
                name: 'managerID'
            }
        ]).then((answer) => {

            queryInsert = 'INSERT INTO employee SET ?';
            connection.query(queryInsert, 
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleID,
                    manager_id: answer.managerID
                }, 
                err => {
                if (err) throw err;
                
                console.log(`Name: ${answer.firstName} ${answer.lastName}, with a role ID of: ${answer.roleID}$, and a manager ID of: ${answer.managerID} successfully added to database.`);
            });
        });
    })
};

