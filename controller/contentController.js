const User = require('../model/income');
const { default: mongoose } = require('mongoose');
const {validationResult} = require('express-validator');


module.exports = new class Contents_Controller {
    constructor(props) {
        
    }

    async getAllContents (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid || req.params.content);
        if (!isValid) {
            return res.json('wrong userid or content id')
        }
        const user = await User.findById(req.params.userid)
        if (!user) {
           return res.status(404).json('not found such user')
        }
        res.status(200).json({content: user.contents})
    }

    async getOneContent (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid || req.params.content);
        if (!isValid) {
            return res.json('wrong userid or content id')
        }

        const user = await User.findById(req.params.userid);
        if (!user) {
            return res.status(404).json('not found such user')
         }
        const content = user.contents.find({_id: req.params.contentid});
        if (!content) {
           return res.status(404).json('not found')
        }
        res.status(200).json({content})
    }

    async createContent (req,  res){
        // const isValid = mongoose.isValidObjectId(req.params.userid || req.params.content);
        // if (!isValid) {
        //     return res.json('wrong userid or content id')
        // }

        // const err = validationResult(req);
        // if(!err.isEmpty()){
        //     return res.status('403').json({data: null, msg: err.array()})
        // }
        // const { type, amount, group, report, date } = req.body;
        // const user = await User.findById(req.params.userid);
        // if (!user) {
        //     return res.status(404).json('not found such user')
        //  }
        // user.contents.push({ type, amount, group, report, date })
        // await user.save(function (err) {
        //     if (!err) console.log('Success!');
        //   });
        res.status(200).json({msg: req.body})
        console.log(req.body);
    }

    async updateContent (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid || req.params.content);
        if (!isValid) {
            return res.json('wrong userid or content id')
        }

        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status('403').json({data: null, msg: err.array()})
        }
        const { type, amount, group, report, date } = req.body;
        const user = await User.findById(req.params.userid);
        if (!user) {
            return res.status(404).json('not found such user')
         }
        let content = user.contents.id(req.params.contentid)
        if (!content) {
            return res.status(404).json('not found')
         }
            content.type = type
            content.amount = amount
            content.group = group
            content.report = report
            content.date = date

        await user.save(function (err) {
            if (!err) console.log('Success!');
          });
        res.status(200).json({msg: "updated successfully"})
    }

    async deleteContent (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid || req.params.content);
        if (!isValid) {
            return res.json('wrong userid or content id')
        }
        
        const user = await User.findById(req.params.userid);
        if (!user) {
            return res.status(404).json('not found such user')
         }
        let content = user.contents.id(req.params.contentid);
        if (!content) {
            return res.status(404).json('not found')
         }
        content.remove();

        await user.save(function (err) {
            if (!err) console.log('Success!');
          });
        res.status(200).json({msg: "deleted successfully"})
    }

}