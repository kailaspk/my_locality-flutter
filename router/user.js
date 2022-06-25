const express = require('express');
const checkUserLogin = require('../middleware/auth')

const {
    register,
    getuser,
    login,
    logout,
    getData,
    getServiceList,
    getoutterArea
   

} = require('../controller/user')

const router = express.Router();

router.post("/register", register),
router.post("/login", login),
router.get("/getuser",checkUserLogin,getuser)
router.get("/getData/:service",checkUserLogin,getData)
router.get("/getServiceList",checkUserLogin,getServiceList)
router.get("/getoutterArea",checkUserLogin,getoutterArea)
router.get("/logout", checkUserLogin, logout)







module.exports = router