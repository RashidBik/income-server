const User = require('../model/income');
const { default: mongoose } = require('mongoose');
const {validationResult} = require('express-validator');

module.exports = new class Contents_Controller {
    constructor(props) {
        
    }

    async getAllContents (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid || req.params.contentid);
        if (!isValid) {
            return res.json('wrong userid or content id')
        }
        const user = await User.findById(req.params.userid)
        if (!user) {
           return res.status(404).json('not found such user')
        }

        let expens = 0;
        let income = 0;
        user.contents.map(content => {
            if(content.type == 'expens'){
               expens += content.amount
            }
            if(content.type == 'income'){
                income += content.amount
             }
        })
        res.status(200).json({content: user.contents, assets: {expens, income}})
    }

    // async getAllContentsByDate (req,  res){
    //     const isValid = mongoose.isValidObjectId(req.params.userid || req.params.contentid);
    //     if (!isValid) {
    //         return res.json('wrong userid or content id')
    //     }
    //     const user = await User.findById(req.params.userid)
    //     if (!user) {
    //        return res.status(404).json('not found such user')
    //     }
    //     const dates = user.contents.map(date => date.date);
    //     dates.sort((a,b) => {
    //         const monthA = a.getMonth();
    //         const monthB = b.getMonth();

    //         const yearA = a.getFullYear();
    //         const yearB = b.getFullYear();

    //     })
    //     // user.contents.map(content => {
    //     //     if(content.date >= 'expens'){
    //     //        expens += content.amount
    //     //     }
    //     //     if(content.type == 'income'){
    //     //         income += content.amount
    //     //      }
    //     // })
    //     res.status(200).json({content: user.contents, assets: {expens, income}})
    // }

    async getOneContent (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid || req.params.contentid);
        if (!isValid) {
            return res.json('wrong userid or content id')
        }

        const user = await User.findById(req.params.userid);
        if (!user) {
            return res.status(404).json('not found such user')
         }
        const content = await user.contents.find(item => item._id == req.params.contentid);
        if (!content) {
           return res.status(404).json('not found')
        }
        res.status(200).json({content})
    }

    async getContentGroup (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid || req.params.contentid);
        if (!isValid) {
            return res.json('wrong userid or content id')
        }

        const user = await User.findById(req.params.userid);
        if (!user) {
            return res.status(404).json('not found such user')
         }
         let groups = [];
        await user.contents.map(group => {
           if(group.group == req.params.group){
            groups.push(group)
           }
        });
        if (!groups) {
           return res.status(404).json('not found')
        }
        res.status(200).json({groups})
    }

    async createContent (req,  res){
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(403).json({data: null, msg: err.array()})
        }
        const isValid = mongoose.isValidObjectId(req.params.userid || req.params.contentid);
        if (!isValid) {
            return res.json('wrong userid or content id')
        }

        const { type, amount, deal, group, report, date } = req.body;
        const user = await User.findById(req.params.userid);
        if (!user) {
            return res.status(404).json('not found such user')
         }
        user.contents.push({ type, amount, deal, group, report, date })
        await user.save(function (err) {
            if (!err) console.log('Success!');
          });
        res.status(200).json(user)
    }

    async updateContent (req,  res){
        console.log(req.body);
        const isValid = mongoose.isValidObjectId(req.params.userid || req.params.contentid);
        if (!isValid) {
            return res.json('wrong userid or content id')
        }

        const err =  validationResult(req);
        if(!err.isEmpty()){
            return await res.status(403).json({data: null, msg: err.array()})
        }
        const { type, amount, deal, group, report, date } = req.body;
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
            content.deal = deal
            content.group = group
            content.report = report
            content.date = date

         user.save(function (err) {
            if (!err) console.log('Success!');
          });
   
        await res.status(200).json({msg: "updated successfully"})

    }

    async deleteContent (req,  res){
        const isValid = mongoose.isValidObjectId(req.params.userid || req.params.contentid);
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