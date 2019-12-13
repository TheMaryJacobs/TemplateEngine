//Required constructors
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
//Required NPMs
const axios = require('axios');
const Inquirer = require("inquirer");
const Jest = require('jest');
const path = require('path');
const fs = require('fs');



//Document values


//Document questions - call these later to ask user below
//Inquirer Documentation helped

//start question, and returns to this question after each employee summary is completed
const startQuestion = [
    {
        type: "list",
        message: "Select an option to begin.",
        name: "adminchoice",
        choices: [
            'Add an employee to the team',
            'Create the team HTML page (Add 1 team member first)'
        ]
    }
]

//manager setupg
const adminQuestions = [
    {
        type: "input",
        message: "Manager name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your employee id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },
    {
        type: "confirm",
        message: "Are you a manager?",
        name: "position",
        choices: [
            'Yes',
            'No'
        ]
    }
];
// remaining employee summary questions
const questions = [
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employee's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee's email?",
        name: "email"
    },
    {
        type: "list",
        message: "What is the employee's title?",
        name: "title",
        choices: [
            'engineer',
            'intern'
        ]
    }
];
// special manager field - office #
const managerQuestion = [
    {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
    }

];
// special engineer field - github username
const engineerQuestion = [
    {
        type: "input",
        message: "What is the employee's GitHUb username?",
        name: "gitname"
    }

];
// special intern field - school
const internQuestion = [
    {
        type: "input",
        message: "What school did the employee go to?",
        name: "school"
    }

];
console.log (startQuestion, adminQuestions, managerQuestion, engineerQuestion, internQuestion, internQuestion);



//Initial arrays - these fill with user info and are used to create HTML cards
let managerArr = [];
let engineerArr = [];
let internArr = [];
let employeeInfo = [];

// these functions are asynchronous because they jump around depending on user choice
//start the thing function
let start =
    async function adminStart() {

        await Inquirer
            .prompt(adminQuestions)

            .then(async function (userData) {
                let managerInfo = {
                    'name': userData.name,
                    'id': JSON.parse(userData.id),
                    'email': userData.email,
                    'role': 'employee', //default setting
                    'title': 'manager',
                    'officeNumber': '',
                    'gitname': '',
                    'github': '',
                    'school': ''

                }
                //start with manager questions, push that to managerArray
                if (position = true) {
                    employeeInfo.push(managerInfo)
                    newemp()
                }
            })
    }

    //accept user input and plop it in a a new userInfo object
    let input =
    async function init() {
        await Inquirer
            .prompt(questions)

            .then(async function (userData) {
                let userInfo = {
                    'name': userData.name,
                    'id': JSON.parse(userData.id),
                    'email': userData.email,
                    'role': 'employee', //default setting
                    'title': userData.title,
                    'officeNumber': '',
                    'gitname': '',
                    'github': '',
                    'school': ''
                }
                employeeInfo.push(userInfo)
                newemp()
            })
    };


    //move to the next step - add another user, or create the PDF
    let next =
    async function adminNext() {
        await Inquirer
            .prompt(adminChoices)
            .then(async function (answers) {
                //
                if (answers.adminchoice === 'Add an employee to the team?') {
                    employeeInfo.length = 0;
                    input()
                }
                if (answers.adminchoice === 'Create the team HTML page?') {
                    createteam()
                }
            })
    };

    //construct a new employee object based on user input
    let newemp =
    async function employeeprofile() {
        const name = employeeInfo[0].name;
        const id = employeeInfo[0].id;
        const email = employeeInfo[0].email;
        const role = employeeInfo[0].role;

        const employee = new Employee(name, id, email, role)
        classdir()
    };

//handle if manager, no promiste rejection


start ()

    // build a manager card at start
    //next
    // build an engineer card when filled out
    //next
    // build an intern card when filled out
    //next


    // CREATE THE TEAM IN AN ARRAY
    // PRINT THE ARRAY ON CARDS IN TEAM.HTML FILE!







