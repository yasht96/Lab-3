const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    careerObjective: {
        type: String,
        default: ""
    },
    education: [{
        university: String,
        location: String,
        degree: String,
        major: String,
        yearOfPassing: String,
        cgpa: String
    }],
    experience: [{
        company: String,
        jobTitle: String,
        location: String,
        description: String,
        startDate: Date,
        endDate: Date
    }],
    applications: [{
        applicationId: Schema.Types.ObjectId,
        status: String,
        companyName: String,
        title: String,
        location: String,
        salary: String,
        jobDescription: String,
        category: String

    }]
})

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;