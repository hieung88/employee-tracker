// import required modules 

const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table")



const connection = mysql.createConnection({
    user:'root',
    password: 'rootroot',
    database: 'employees_db',
    host: 'localhost'
});

// create questions 
const questions = [
    {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "Remove Employee", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
    }
];

//create function to view all employees
function viewAllEmployees() {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title, department.department_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id ORDER BY employee.id ASC`, function (err, results, fields) {
        if (err) {
            console.log(err);
            return;
        }
        console.table(results);
        init();
    });
}

function viewAllRoles() {
    connection.query(`SELECT role.id, role.title, department.department_name, role.salary FROM role JOIN department ON role.department_id = department.id`, function (err, results, fields) {
        if (err) {
            console.log(err);
            return;
        }
        console.table(results);
        init();
    });
}

function viewAllDepartments() {
    connection.query(`SELECT id, department_name FROM department`, function (err, results, fields) {
        if (err) {
            console.log(err);
            return;
        }
        console.table(results);
        init();
    });
}

function init() {
    inquirer.prompt(questions).then(function(data){
    if (data.choices === "View All Employees"){
        viewAllEmployees()
    }
    if (data.choices === "View All Roles"){
        viewAllRoles()
    }
    if (data.choices === "View All Departments"){
        viewAllDepartments()
    }
})

};

init();