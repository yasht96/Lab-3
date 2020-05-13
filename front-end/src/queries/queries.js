import {gql} from 'apollo-boost'

const getStudentsQuery = gql`
{
  students{
    _id
    name
    city
    collegeName
  }
}
`
const getStudent = gql`
query($id:ID!){
    student(id:$id){
      _id
      name
      applications{
        applicationId
        category
        companyName
        location
        status
        title
        jobDescription
      }
    }
}
`

const getStudentProfile = gql`
query($id: ID!){
    student(id: $id){
      _id
      name
	  country
      city
      state
      dateOfBirth
      careerObjective   
      education{
        _id
        cgpa
        location
        university
        major
        degree
        yearOfPassing
      }
      experience{
        _id
        jobTitle
        location
        startDtae
        endDtate
        description
        company
      }
    }
  }
`

const getJobApplicants = gql`
query($id: ID!){
	job(id:$id){
    _id
  	title
    students{
      _id
      studentId
      name
      cgpa
      university
    }
  }
}
`
const jobSearch = gql`
query($name: String!){
	jobSearch(name: $name){
    _id
    companyName
    jobDescription
    location
    title
    category
    deadline
    postingDate
    salary
  }
}
`
const applyJobs = gql`
mutation($id:ID!, $studentId:ID!, $university: String!, $cgpa: String!, $name: String!){
	applyJob(id:$id, 
    studentId: $studentId,
    university:$university,
    cgpa: $cgpa,
    name: $name){
    _id
    name
    applications{
      applicationId
      status
      companyName
      title
      jobDescription
    }
    
  }
}
`
const updateStudentProfile = gql`
mutation($id:ID!, $name:String!, $city:String!, $state: String!, $country: String!, $dataOfBirth: String!){
    updateStudentBasicDetails(id:$id, name:$name, city:$city, country:$country, state:$state, dateOfBirth:$dateOfBirth) {
      _id
      name
      collegeName
      country
      city
      state
      dateOfBirth
    }
}
`
const addJob = gql`
mutation($companyName: String!, $title: String!, $jobDescription: String!, $location:String!, $salary: String!, $deadline: String!, $postingDate: String!, $category: String!){
    addJob(companyName: $companyName, 
    title:$title, 
    jobDescription: $jobDescription,
    location:$location,
    salary:$salary, 
    deadline:$deadline, 
    postingDate:$postingDate,
    category:$category){
      _id
      companyName
      title
      jobDescription
      location
      salary
      deadline
      postingDate
      category
    }
  }
`

const employerLogin = gql`
query($emal: String!, $password: String!){
    employerLogin(email:$email, password: $password){
      _id
      name
      description
      location
      email
    }
  }
`

const studentLogin = gql`
query($emal: String!, $password: String!){
    studentLogin(email:$email, password: $password){
      _id
      name
      email
      collegeName
    }
  }
`

const getJobs = gql`
query{
    jobs{
      _id
      jobDescription
      title
      location
      deadline
      postingDate
      salary
      companyName
      category
    }
  }
`

const getEmployer = gql`
query($id:ID!){
	employer(id:$id){
    _id
    name
    email
    description
    location
  }
}
`
const addStudent = gql`
mutation($name:String!, $email:String!, $password:String!, $collegeName:String!){
    addStudent(name:$name,email:$email,password:$password,collegeName:$collegeName){
      _id
      name
      email
      collegeName
    }
  }
`

export {getStudent, 
    getStudentProfile, 
    getStudentsQuery, 
    getJobApplicants, 
    jobSearch, 
    applyJobs,
    updateStudentProfile,
    addJob,
    employerLogin,
    studentLogin,
    getJobs,
    getEmployer,
    addStudent
}