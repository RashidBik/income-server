module.exports = new class AuthContorller{
    constructor(){

    }
    
    async createUser (req,  res){
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(403).json({data: null, msg: err.array()})
        }
        const {name, job, email, password} = req.body;
       
        const user = await new User({name, job, email, password});

         user.save(()=> console.log('sucessfuly created'));
         res.status(200).json({data: user._id});
    }

}