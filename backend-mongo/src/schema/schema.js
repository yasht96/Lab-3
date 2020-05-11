const graphql = require('graphql')
const Employer = require('../models/employer')
const Student = require('../models/student')

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
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery
});

module.exports = schema;