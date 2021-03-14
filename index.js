const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection.js');

// establish connection to sql database 
connection.connect((err) => {
    if (err) throw err;

    console.log(`Connection established via thread #: ${connection.threadId}.`);
    
    // start the application once connection established
    loadApp();
});

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
            
            case 'Add role':
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
        data.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
               let employees = [id, first_name, last_name, role_id, manager_id];
               employeesArr.push(employees);
        });
        // Prints the results to the console
        console.log('\n');
        console.table(['Employee ID', 'First Name', 'Last Name', 'Role Id', 'Manager ID'], employeesArr);
        console.log('\n');

        // Reruns loadApp function
        return loadApp();
        
    });   
};

const viewAllDepts = () => {
    const query = 'SELECT * FROM department';
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
                
                // Logs result confirmation to the console.
                console.log('\n', 'The following department was added to the database:', '\n');
                
                console.table([{Department: `${answer.newDept}`}]);

                return loadApp();
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

                // Logs result confirmation to the console.
                console.log('\n', 'The following role was added to the database:', '\n');

                console.table([{Title: `${answer.title}`, 'Salary': `$${answer.salary}`, 'Department ID': `${answer.deptID}`}]);

                return loadApp();
            });
        }).catch(err => {console.error((err))});
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
                message: 'What is the manager ID of the new role?',
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
                
                // Logs result confirmation to the console.
                console.log('\n', 'The following employee was added to the database:', '\n');
        
                console.table([{First_Name: `${answer.firstName}`, Last_Name: `${answer.lastName}`, Role_ID: `${answer.roleID}`, Manager_ID: `${answer.managerID}`}]);

                return loadApp();
            });
        }).catch(err => {console.error(err)});
    })
};

const updateEmployeeRole = () => {
    query = 'SELECT * FROM employee';
    connection.query(query, (err, data) => {
        if (err) throw err;

        let employeesArr = [];
        // loops through each employee and outputs their information
        data.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
               let employees = [id, first_name, last_name, role_id, manager_id];
               employeesArr.push(employees);
        });
        // Prints the results to the console
        console.log('\n');
        console.table(['Employee ID', 'First Name', 'Last Name', 'Role Id', 'Manager_ID'], employeesArr);
        console.log('\n');

        inquirer.prompt([
            {
                type: 'choice',
                message: 'What is the employee_id of the employee you would like to update?',
                name: 'selectEmployee',
                choices() {
                    const employeeIDArr = [];
                    data.forEach(({id}) => {
                        employeeIDArr.push(id);
                    });
                    return employeeIDArr;
                }
            },
            {
                type: 'input',
                message: 'What is the role ID of the new role the employee will be taking?',
                name: 'roleID'
            }
        ]).then((answer) => {

            queryInsert = 'UPDATE employee SET role_id = ? WHERE id = ?';
            connection.query(queryInsert, [answer.roleID, answer.selectEmployee], (err, data) => {
                if (err) throw err;
                
                // Logs result confirmation to the console.
                console.log('\n', 'The employee was updated in the database:', '\n');
        
                console.table(data);

                return loadApp();
            });
        }).catch(err => {console.error(err)});
    })   
}

