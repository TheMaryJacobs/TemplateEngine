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



//Document questions - call these later to ask user below
//Inquirer Documentation helped

//start question, and returns to this question after each employee summary is completed
const startQuestion = [
    {
        type: "list",
        message: "Select an option to begin.",
        name: "startQuestion",
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
        message: "Hello Manager! What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your employee id number?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },

    //BOOLEAN 
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
        message: "What is the employee's id number?",
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
        message: "What is the engineer's GitHUb username?",
        name: "gitname"
    }

];
// special intern field - school
const internQuestion = [
    {
        type: "input",
        message: "What school did the intern attend?",
        name: "school"
    }

];
// console.log (startQuestion);



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
            .prompt(startQuestion)
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
            .prompt(startQuestion)
            .then(async function (answers) {
                //
                if (answers.startQuestion === 'Add an employee to the team') {
                    employeeInfo.length = 0;
                    input()
                }
                if (answers.startQuestion === 'Create the team HTML page (Add 1 team member first)') {
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


let classdir =
    async function bytitle() {

        if (employeeInfo[0].title === "manager") {
            buildManager()
        }
        if (employeeInfo[0].title === "engineer") {
            buildEngineer()
        }
        if (employeeInfo[0].title === "intern") {
            buildIntern()
        }
    };



    // build a manager card at start
    async function buildManager() {

        await Inquirer
            .prompt(managerQuestion)
    
            .then(async function (userData) {
                let managerAns = {
                    'officeNumber': JSON.parse(userData.officeNumber)
                }
                employeeInfo[0].officeNumber = managerAns.officeNumber;
    
                const name = employeeInfo[0].name;
                const id = employeeInfo[0].id;
                const email = employeeInfo[0].email;
                const role = employeeInfo[0].role;
                const officeNumber = employeeInfo[0].officeNumber;
            
                const manager = new Manager(name, id, email, officeNumber)
                managerArr.push(manager);
    
            })
             //next
            next()
        };
    
   
    // build an engineer card when filled out
    async function buildEngineer() {
        await Inquirer
            .prompt(engineerQuestion)
    
            .then(async function (userData) {
                let engineerInfo = {
                    'gitname': userData.gitname
                }
                employeeInfo[0].gitname = engineerInfo.gitname;
            })
            .then(async function() {
    
                const gitname = employeeInfo[0].gitname;
                let queryURL = 'https://api.github.com/users/' + gitname;
                axios
                    .get(queryURL).then(async function (response) {
                        const engineerInfo = {
                            "github": response.data.login,
                        }
            
                        employeeInfo[0].github = engineerInfo.github;
                        
                    })
            })
                            setTimeout(function(){
                            const name = employeeInfo[0].name;
                            const id = employeeInfo[0].id;
                            const email = employeeInfo[0].email;
                            const role = employeeInfo[0].role;
                            const gitname = employeeInfo[0].gitname;
                            const github = employeeInfo[0].github;
                        
                            const engineer = new Engineer(name, id, email, gitname, github)
                 
                            engineerArr.push(engineer)
                            }, 2000);
                        
    next()
    };
    //next

    // build an intern card when filled out
    async function buildIntern() {
        await Inquirer
            .prompt(internQuestion)
    
            .then(async function (userData) {
                let internInfo = {
                    'school': userData.school
                }
                employeeInfo[0].school = internInfo.school;
            })
            const name = employeeInfo[0].name;
            const id = employeeInfo[0].id;
            const email = employeeInfo[0].email;
            const role = employeeInfo[0].role;
            const school = employeeInfo[0].school;
    
        const intern = new Intern(name, id, email, school);
        internArr.push(intern)
        next()
    };

    //next


    // CREATE THE TEAM IN AN ARRAY
    // ASYNC becuase we have to run through each job title 
    //array and create HTML based on what employee types are on the team

    createteam =
    async function teamHTML() {

    // PRINT THE ARRAY ON CARDS IN TEAM.HTML FILE!

    //this is annoying why can't it be on separate lines
    fs.writeFileSync('./output/teampage.html',
    '<DOCTYPE! HTML>' +
    '<html>' +
    '<head>' +
    '<meta charset="UTF-8">' +
    '<link rel="stylesheet" type="text/css" href="style.css">' +
    '<link href="https://fonts.googleapis.com/css?family=Bebas+Neue|Roboto|Roboto+Slab&display=swap" rel="stylesheet">' +
    '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0"/> ' +
    '<meta http-equiv="X-UA-Compatible" content="ie=edge" />' +
    '</head>' +
    '<body>' +
    '<header>' +
    '<h1 class="teamname"> Team Summary </h1>' +
    '</header>' +
    '<container>' +
    '<div class="row">' 
);

fs.appendFileSync('./output/teampage.html',
    '<div class="col">' +
    '<div id="manager">' +
    '<div class="card">' +
    '<div class="card-header managerstyle">' + managerArr[0].name + '</div>' +
        '<div class="card-body">' +
            '<div class=content>' +

            '<p>' + "<span> ID: </span>" + managerArr[0].id + '</p> <hr>' +
            '<p>' + "<span> Email: </span>" + managerArr[0].email + '</p> <hr>' +
            '<p>' + "<span> Office Number: </span>" + managerArr[0].officeNumber + '</p>' +

            '</div>' +
        '</div>' +
    '<div class="card-footer managerstyle">' + "Manager" + '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
);


//loop through and make a card for each intern in the InternArray
for (i = 0; i < engineerArr.length; i++) {
    fs.appendFileSync('./output/teampage.html',
        '<div class="col">' +
        '<div id="engineer">' +
        '<div class="card">' +
        '<div class="card-header engineerstyle">' + engineerArr[i].name + '</div>' +
        '<div class="card-body">' +
        '<div class=content>' +

        '<p>' + "<span> ID: </span>" + engineerArr[i].id + '</p> <hr>' +
        '<p>' + "<span> Email: </span>" + engineerArr[i].email + '</p> <hr>' +
        '<p>' + "<span> GitHub </span>" + engineerArr[i].gitname + '</p>' +

        '</div>' +
        '</div>' +
        '<div class="card-footer engineerstyle"> Engineer </div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
}

//loop through and make a card for each intern in the InternArray
for (i = 0; i < internArr.length; i++) {
    fs.appendFileSync('./output/teampage.html',
        '<div class="col">' +    
        '<div id="intern">' +
        '<div class="card">' +
        '<div class="card-header internstyle">' + internArr[i].name + '</div>' +
        '<div class="card-body">' +
        '<div class=content>' +

        '<p>' + "<span> ID: </span>" + internArr[i].id + '</p><hr>' +
        '<p>' + "<span> Email: </span>" + internArr[i].email + '</p><hr>' +
        '<p>' + "<span> College: </span>" + internArr[i].school + '</p>' + 

        '</div>' +
        '</div>' +
        '<div class="card-footer internstyle"> Intern </div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
}

fs.appendFileSync('./output/teampage.html', 
    '</div>' +
    '</div>' +
    '</container>' +
    '</body>' +
    '</html>'
);

//tell the user where their new file can be found
console.log('Your Team Summary html file is in the output folder')
}



start ()