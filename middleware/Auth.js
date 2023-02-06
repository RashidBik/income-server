const jwt = require("jsonwebtoken");

const validateToken = (req, res , next) => {
    const accessToken = req.headers.accesstoken
    if (accessToken) {
       try {
        jwt.verify(accessToken, 'ACCESS_KEY',(err, user)=>{
            if(!err){
                req.user = user
                next();
            }
        });

        } catch (error) {
            res.json(err)
        }
    
    } else {
        console.log(accessToken, 'not');
        // return res.json('user not logged in')
    }
}

module.exports = validateToken;