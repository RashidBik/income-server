const {check} = require('express-validator');

module.exports = new class Validator{
    constructor(props) {
    
    }

    userValidator(){
        return [
            check('name','name cannt be empty').not().isEmpty(),
            check('job','job cannot be empty').not().isEmpty(),
            check('email','your email is not valid').not().isEmail(),
            check('password','password cannt be empty').not().isEmpty()
        ]
    }
    contentValidator(){
        return [
            check('type','type cannt be empty').not().isEmpty(),
            check('amount','amount cannot be empty').not().isEmpty(),
            check('group','group cannt be empty').not().isEmpty(),
            check('date','date cannt be empty').not().isEmpty()
        ]
    }
    
}