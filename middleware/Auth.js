const jwt = require("jsonwebtoken");

const validateToken = (req, res , next) => {
    const accessToken = req.header('accessToken')
    if (accessToken) {
       try {
        const decoded = jwt.verify(accessToken, 'ACCESS_KEY');
            if (decoded) return next();
        } catch (error) {
            res.json(err)
        }
    console.log(accessToken);
    } else {
        console.log(accessToken, 'not');
        // return res.json('user not logged in')
    }
}

module.exports = validateToken;