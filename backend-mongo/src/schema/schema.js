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
        major: { type: GraphQLString },
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
        major: { type: GraphQLString },
        collegeName: { type: GraphQLString },
        contactNumber: { type: GraphQLInt },
        dateOfBirth: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        careerObjective: { type: GraphQLString },
        skillSet: { type: new GraphQLList(GraphQLString) },
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
        companyJobs: {
            type: new GraphQLList(JobType), 
            args: { name: { type: GraphQLString }},
            resolve(parent, args) {
                return Job.find({companyName: args.name})
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
                email: { type: GraphQLInt },
                password: { type: GraphQLID },

            },
            resolve(parent, args) {
                let author = {
                    name: args.name,
                    age: args.age,
                    id: args.id
                };
                authors.push(author)
                console.log("Authors", authors);
                return author;
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                let book = {
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                    id: books.length+1
                }
                books.push(book);
                return book;
            }
        }

    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;