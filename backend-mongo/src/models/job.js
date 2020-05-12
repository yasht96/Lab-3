const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobPostSchema = new Schema({  
    companyName: String,
    title: String,
    postingDate: String,
    deadline: String,
    location: String,
    salary: String,
    jobDescription: String,
    category: String,
    students: [{    
        studentId: Schema.Types.ObjectId,
        name: String,
        university: String,
        cgpa: String, 
    }]
})

const JobPost = mongoose.model('jobpost', JobPostSchema);

module.exports = JobPost;