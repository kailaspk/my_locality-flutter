const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let dataSchema = new Schema({
    serviceName: {
        type: String,
        require: [true, 'please enter a serviceName'],
    },
    description: {
        type: String,
    },
    name: {
        type: String,
        require: [true],
    },
    address: {
        type: String,
        default: 'user'
    },
    website: {
        type: String
    },
    number: {
        type: Number
    },
    zip: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    },
    image:{
        type: String
    },
    suggestions:{
        type: Array
    }

}, { timestamps: true });





const Data = mongoose.model('data', dataSchema)
module.exports = Data