const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {type: String, default: ""},
    description: {type: String, default: ""}, 

})

const Employer = mongoose.model('employer', EmployerSchema);

module.exports = Employer;