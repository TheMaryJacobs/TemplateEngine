// * name
// * id
// * title/role
// * email too


//The Greatest Grandfather Parent
class Employee{
    constructor(name, id, email, role='Employee'){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
}

// * getName()
    getName(){
    return this.name;
    }

// * getId()
    getId(){
        return this.id;
    }

// * getEmail()
    getEmail(){
        return this.email;
    }

// * getRole() // Returns 'Employee'

    getRole(){
    return this.role;
    }


}

//this makes it work
module.exports =  Employee;