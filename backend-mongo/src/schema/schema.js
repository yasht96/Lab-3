const graphql = require('graphql')
const Employer = require('../models/employer')
const Student = require('../models/student')
const Job = require('../models/job')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const EducationType = new GraphQLObjectType({
    name: 'Education',
    fields: () => ({
        _id: { type: GraphQLID },
        university: { type: GraphQLString },
        location: { type: GraphQLString },
        degree: { type: GraphQLString },
        major: { type: GraphQLString },
        yearOfPassing: { type: GraphQLString },
        cgpa: { type: GraphQLString },
    })
})

const ExperienceType = new GraphQLObjectType({
    name: 'Experience',
    fields: () => ({
        _id: { type: GraphQLID },
        company: { type: GraphQLString },
        jobTitle: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        startDtae: { type: GraphQLString },
        endDtate: { type: GraphQLString }
    })
})

const EmployerType = new GraphQLObjectType({
    name: 'Employer',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        contactNumber: { type: GraphQLInt },

    })
});

const StudentApplication = new GraphQLObjectType({
    name: 'StudentApplication',
    fields: () => ({
        _id: { type: GraphQLID },
        studentId: { type: GraphQLID },
        name: { type: GraphQLString },
        university: { type: GraphQLString },
        cgpa: { type: GraphQLString }
    })
})

const JobType = new GraphQLObjectType({
    name: 'Job', 
    fields: () => ({
        _id: { type: GraphQLID },
        companyName: { type: GraphQLString },
        title: { type: GraphQLString },
        postingDate: { type: GraphQLString },
        deadline: { type: GraphQLString },
        location: { type: GraphQLString },
        salary: { type: GraphQLString },
        jobDescription: { type: GraphQLString },
        category: { type: GraphQLString },
        students: { type: new GraphQLList(StudentApplication) }
    })
})

const ApplicationsType = new GraphQLObjectType({
    name: 'Applications',
    fields: () => ({
        applicationId: { type: GraphQLID },
        status: { type: GraphQLString },
        companyName: { type: GraphQLString },
        title: { type: GraphQLString },
        location: { type: GraphQLString },
        salary: { type: GraphQLString },
        jobDescription: { type: GraphQLString },
        category: { type: GraphQLString }
    })
})

const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        collegeName: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        careerObjective: { type: GraphQLString },
        education: { type: new GraphQLList(EducationType) },
        experience: { type: new GraphQLList(ExperienceType) },
        applications: { type: new GraphQLList(ApplicationsType) }
    })
}); 

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        employers: {
            type: new GraphQLList(EmployerType),
            resolve(parent, args) {
                return Employer.find({});
            }
        },
        students: {
            type: new GraphQLList(StudentType),
            resolve(parent, args) {
                return Student.find({});
            }
        },
        jobs: {
            type: new GraphQLList(JobType),
            resolve(parent, args) {
                return Job.find({});        
            }
        },
        employer: {
            type: EmployerType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                return Employer.findOne({_id: args.id})
            }
        },
        student: {
            type: StudentType, 
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                return Student.findOne({_id: args.id})
            }
        },
        job: {
            type: JobType, 
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                return Job.findOne({_id: args.id})
            }
        },
        jobSearch: {
            type: new GraphQLList(JobType), 
            args: { name: { type: GraphQLString }},
            resolve(parent, args) {
                return Job.find({companyName: args.name});
            }
        },
        companyJobs: {
            type: new GraphQLList(JobType), 
            args: { name: { type: GraphQLString }},
            resolve(parent, args) {
                return Job.find({companyName: args.name})
            }
        },
        studentLogin: {
            type: StudentType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString } 
            },
            resolve: async (parent, args) => {
                const student = await Student.findOne({email: args.email});
                console.log(student);
                if(student !== null) {
                    if(args.password == student.password) {
                        return student;
                    }else{
                        return {error: "Incorrect Credentials"};
                    }
                }
                return {error: "Incorrect Credentials"};

            }
        },
        employerLogin: {
            type: EmployerType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const employer = await Employer.findOne({email: args.email});
                console.log(employer);
                if(employer !== null) {
                    if(args.password == employer.password) {
                        return employer;
                    }else{
                        return {error: "Incorrect Credentials"};
                    }
                }
                return {error: "Incorrect Credentials"};
            }
        }
    }
});



const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStudent: {
            type: StudentType,
            args: { 
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                collegeName: { type: GraphQLString },
                dateOfBirth: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString }
            },
            resolve(parent, args) {
            //console.log(args);
              const student = new Student(args);
              return student.save()
            }
        },
        addEmployer: {
            type: EmployerType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                location: { type: GraphQLString },
            },
            resolve(parent, args) {
                const employer = new Employer(args);
                return employer.save();
            }
        },
        updateEmployer: {
            type: EmployerType,
            args: {
                id: {},
                name: {},
                location: {},
                description: {}
            },
            resolve: async (parent, args) => {
                const employer = await Employer.findById({_id: args.id});
                employer.name = args.name;
                employer.location = args.location;
                employer.description = args.description;
                return employer.save();
            }
        },
        updateStudentBasicDetails: {
            type: StudentType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                dateOfBirth: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString }
            },
            resolve: async (parent, args) => {

                const student = await Student.findById({_id: args.id});
                student.name = args.name;
                student.dateOfBirth = args.dateOfBirth;
                student.city = args.city;
                student.state = args.state;
                student.country = args.country;
                return student.save();
            }
        },
        updateEducation: {
            type: StudentType,
            args: {
                studentId: { type: GraphQLID },
                id: { type: GraphQLID },
                university: { type: GraphQLString },
                location: { type: GraphQLString },
                degree: { type: GraphQLString },
                major: { type: GraphQLString },
                yearOfPassing: { type: GraphQLString },
                cgpa: { type: GraphQLString }, 
            },
            resolve: async (parent, args) => {

                const student = await Student.findOne({_id: args.studentId});
                student.education.map((education) => {
                    if(education._id == args.id) {
                        education.university =  args.university;
                        education.location =  args.location,
                        education.degree = args.degree,
                        education.major = args.major,
                        education.yearOfPassing = args.yearOfPassing,
                        education.cgpa = args.cgpa
                    }
                })
                //console.log(student);
                return student.save();
            }
        },
        updateExperience: {
            type: StudentType,
            args: {
                studentId: { type: GraphQLID },
                id: { type: GraphQLID },
                company: { type: GraphQLString },
                jobTitle: { type: GraphQLString },
                location: { type: GraphQLString },
                description: { type: GraphQLString },
                startDtae: { type: GraphQLString },
                endDtate: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const student = await Student.findOne({_id: args.studentId});
                student.experience.map((experience) => {
                    if(experience._id == args.id) {
                        experience.company =  args.company;
                        experience.location =  args.location,
                        experience.jobTitle = args.jobTitle,
                        experience.description = args.description,
                        experience.startDtae = args.startDtae,
                        experience.endDtate = args.endDtate
                    }
                })
                //console.log(student);
                return student.save();
            }
        }
        
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;