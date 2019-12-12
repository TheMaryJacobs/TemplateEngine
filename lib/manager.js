//needs parent constructor
const Employee = require('./employee');

// Manager

class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
}
// * officeNumber
    getOfficeNumber(){
    return this.officeNumber;
    }
    
// * getRole() // Overridden to return 'Manager'
    getRole(){
    return 'Manager';
    }
 
}






















// this makes it work
module.exports =  Manager;