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
//Initial arrays
let managerArr = [];
let engineerArr = [];
let internArr = [];
let employeeInfo = [];
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

//manager setup
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
