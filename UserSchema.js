const mongoose = require('mongoose');

const useSchema = new mongoose.Schema({
    Name: {
        type: "String",
    },
    Email: {
        type: "String",
         unique:true
         
    },
    Password: {
        type: "String",
    },
    Confirm_Passwod: {
        type: "String",
    }
})
module.exports = mongoose.model("user", useSchema)