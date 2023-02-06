const User = require('../model/income');
const {validationResult} = require('express-validator');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

module.exports = new class UserController {
    constructor() {}

    async login(req, res){
        const {email, password} = req.body;
        const user = await User.find({email: email });
        if (!user) {
            return res.status(404).json('not found such user')
        } else {
             console.log(user[0]);
             const token = jwt.sign({ user: user._id, email: user[0].email }, 'ACCESS_KEY');
             await res.json({token})
         }
    }

    async getOneUser (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid);
        if (!isValid) {
            return res.json('wrong userid')
        }

        const user = await User.findById(req.params.userid);
        if (!user) {
            return res.status(404).json('not found such user')
         }
        res.status(200).json({user})
    }

    async createUser (req,  res){
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(403).json(err.array())
        }
        const {name, job, email, password} = req.body;
        const user = await new User({name, job, email, password});
            if (user) {
                await user.save();
                res.status(200).json('successfully registerd');      
            } else {
               await res.status(404).json('user not found');      
            }
    }

    async updateUser (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid);
        if (!isValid) {
            return res.json('wrong userid')
        }
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(403).json(err.array())
        }
        const {name, job, email, password} = req.body;
        const user = await User.findByIdAndUpdate({_id: req.params.userid},{name, job, email, password});
        if (!user) {
            return res.status(404).json('not found such user')
         }
        await res.status(200).json(user);
    }

    async deleteUser (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid);
        if (!isValid) {
            return res.json('wrong userid')
        }
        const user = await User.findByIdAndDelete(req.params.userid);
        if (!user) {
            return res.status(404).json('not found such user')
         }
        res.json( "deleted succesfully")
    }

}