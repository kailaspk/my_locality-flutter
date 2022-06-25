const AllData = require('../models/allinone');
const Datas = require('../models/data');
const router = require('../router/user');
const axios = require("axios");



//add datas
exports.addData = async (req, res) => {
    try {
        if (req.user.role == 'admin') {
            let data = new Datas(req.body);
            await data.save()
            return res.status(200).send({ success: true, data: data, message: 'Successfully Added Datas' })
        } else {
            return res.status(400).send({ success: false, message: "Only for admin" })
        }
    } catch (err) {
        console.log("weee",err);
        res.status(401).send({ success: false, message: "Failed to adda data" })
    }
};





//delete data
exports.deleteData = async (req, res) => {
    try {
        if (req.user.role == 'admin') {
            let data = await Datas.deleteOne({ _id: req.params.id })
            res.status(200).send({ success: true, message: "Data Deleted" });
        } else {
            return res.status(400).send({ success: false, message: "Only for admin" })
        }
    } catch (error) {
        res.status(400).send({ success: false, message: "Data cannot be Deleted" });
    }
};


exports.api = async (req, res) => {
    try {
        if (req.user.role == 'admin') {
            const options = {
                method: 'GET',
                url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
                params: { query: 'kerala', locale: 'en_US', currency: 'INR' },
                headers: {
                    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
                    'X-RapidAPI-Key': 'f1de741756msh4ca18df57746ea4p15daa0jsne42cc8cd2b29'
                }
            };

            axios.request(options).then(async function (response) {
                console.log("============fwfwdf===========", response.data.suggestions);
                let data = new AllData({ suggestions: response.data.suggestions });
                // let data = await AllData.find({})
                //  data.suggestions = response.data.suggestions
                await data.save()
                return res.status(200).send({ success: true, data: response.data, message: "the weather" })
            }).catch(function (error) {
                console.error(error);
            });
        } else {
            return res.status(400).send({ success: false, message: "Only for admin" })
        }


    } catch (error) {
        console.log("========er============", error);
        return res.status(400).send({ success: false, message: "failed" });
    }
}
