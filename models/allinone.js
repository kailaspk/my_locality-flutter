const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let allDataSchema = new Schema({
    suggestions:{
        type: Array
    }

}, { timestamps: true });





const AllData = mongoose.model('allData', allDataSchema)
module.exports = AllData