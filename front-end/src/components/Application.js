import React from 'react';
import Header from './Header';
import ApplicationItem from './ApplicationItem';
import ApplicationSideList from './ApplicationSideList';
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'


const getStudent = gql`
  {
    student(id:"5e996d140c49d423b10b0e68"){
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

class Application extends React.Component {
  constructor() {
    super();
    this.state = { applications: [], currentPageNumber: 1 };
  }

  componentDidMount() {
    const studentId = '5e996d140c49d423b10b0e68';
  }

 

  render() {
  console.log(this.props.data)
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <div style={{float: 'left', width: '25%', marginLeft: '30px', marginTop: '20px'}}>
            <ApplicationSideList />
          </div>
          <div style={{float: 'left', marginLeft: '10px', width: '70%', marginTop: '20px'}}>
              {this.props.data.student && this.props.data.student.applications.map(application => {
                return (
                  <div className='ui raised segment' style={{ width: '75%' }}>
                    <ApplicationItem key={application._id} application={application} />
                  </div>
                );
              })}
            <div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default graphql(getStudent)(Application);
