//needs parent constructor
const Employee = require('./employee');

// Engineer
// * github  // GitHub username
class Engineer extends Employee{
    constructor(name,id,email,github){
        super(name,id,email);
        this.github = github

    }


// * getGithub()
getGithub (){
    return this.github;
}
// * getRole() // Overridden to return 'Engineer'
getRole (){
    return 'Engineer';
}

}

//this makes it work
module.exports =  Engineer;