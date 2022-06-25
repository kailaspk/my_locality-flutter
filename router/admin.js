const express = require('express');
const checkUserLogin = require('../middleware/auth')

const {
    addData,
    api,
    deleteData,

} = require('../controller/admin')

const router = express.Router();

router.post("/admin/addData", checkUserLogin,addData),
router.get("/api",checkUserLogin, api),
router.get("/admin/deleteData",checkUserLogin,deleteData)







module.exports = router