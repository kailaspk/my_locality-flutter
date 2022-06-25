const User = require('../models/user');
const jwt = require('jsonwebtoken');
// require('dotenv').config()


//middleware
async function checkUserLogin(req, res, next) {
    const token = req.cookies.token;
    try {
        jwt.verify(token, process.env.PASSKEY, async(err, decode) => {
            if (err)
                return res.status(400).send({ success: false, message: 'please authenticate' });
            req.email = decode.email
            const user = await User.findOne({ email: req.email });
            req.user = user;
            next();
        });
        
    } catch (err) {
        res.status(401).send({ success: false, message: 'please authenticate' })
    }
}


module.exports = checkUserLogin