//needs parent constructor
const Employee = require('./employee');

// Intern// * school
class Intern extends Employee{
    constructor(name,id,email,school){
        super(name,id,email);
        this.school = school;
}

// * getSchool()
getSchool(){
    return this.school;
}
// * getRole() // Overridden to return 'Intern'
getRole(){
    return 'Intern';
}
}

//this makes it work
module.exports =  Intern;