const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            // verify token use to  decrypt, if its decrypt then we get user information
            let user = jwt.verify(token,process.env.SECRET_KEY);
            req.userId = user.id;
        }else{
            return res.status(401).json({message: "Unauthorized User"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized User"});
    }
}

module.exports = auth;