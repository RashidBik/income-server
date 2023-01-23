const User = require('../model/income');
const {validationResult} = require('express-validator');
const { default: mongoose } = require('mongoose');

module.exports = new class UserController {
    constructor(props) {
        
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
        res.json({user})
    }

    async createUser (req,  res){
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status('403').json({data: null, msg: err.array()})
        }
        const {name, job, email, password} = req.body;
        const user = new User({name, job, email, password});
        if (!user) {
            return res.status(404).json('not found such user')
         }
        await user.save();
        await res.status(200).json({data: user});
    }

    async updateUser (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid);
        if (!isValid) {
            return res.json('wrong userid')
        }
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status('403').json({data: null, msg: err.array()})
        }
        const {name, job, email, password} = req.body;
        const user = await User.findByIdAndUpdate({_id: req.params.userid},{name, job, email, password});
        if (!user) {
            return res.status(404).json('not found such user')
         }
        await res.status(200).json({data: user});
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
        res.json({msg: "deleted succesfully"})
    }

}