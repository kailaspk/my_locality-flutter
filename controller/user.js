const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = require('../router/user');
const Datas = require('../models/data');
const AllData = require('../models/allinone');



//welcome user
exports.register = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        // sendemail(user.email, user._id)
        return res.status(200).send({ success: true, message: 'Successfully Register' })
    } catch (err) {
        res.status(401).send({ success: false, message: "Check Your Credentials" })
    }
};



//login user
exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        if (user.role == 'user') {
            const token = jwt.sign({ email: user.email }, process.env.PASSKEY, { expiresIn: 60 * 60 * 60 });
            res.cookie('token', token, {
                maxAge: 2 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.status(200).send({ success: true, message: "Login Successful" })
            // .send({ auth: true, token: token, message: 'logged in' })
            //  })   
        } else if(user.role == "admin"){
            const token = jwt.sign({ email: user.email }, 'thisisthesecretkey', { expiresIn: 60 * 60 * 60 });
            res.cookie('token', token, {
                maxAge: 2 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.status(200).send({ success: true, message: "Admin Login Successful" })
        }

    } catch (error) {
        res.status(401).send({ success: false, message: "Password Mismatch" })
    }
};

//get user
exports.getuser = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user.id })
    res.status(200).send({ data: user, message: "the user data" });
    } catch (error) {
    res.status(401).send({success: false, message: "User data cannot be fetched" });
    }
}


//logout
exports.logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ success: true, message: 'Logout Success' })
};


//get datas
exports.getData = async (req, res) => {
    try {
        let data = await Datas.find({ serviceName: req.params.service })
    res.status(200).send({ data: data, message: "the data" });
    } catch (error) {
    res.status(400).send({success: false, message: "Data cannot be fetched" });
    }
}

//get servicelist
exports.getServiceList = async (req, res) => {
    try {
        let data = await Datas.find({})
        let result = data.map(item => item.serviceName);
        let uniqueChars = [...new Set(result)]
    res.status(200).send({ data: uniqueChars, message: "the data" });
    } catch (error) {
    res.status(400).send({success: false, message: "Data cannot be fetched" });
    }
}

exports.getoutterArea = async (req, res) => {
    try {
        let data = await AllData.find({ })
        // console.log("===========data===",data);
    res.status(200).send({ data: data, message: "the data" });
    } catch (error) {
    res.status(400).send({success: false, message: "Data cannot be fetched" });
    }
}
