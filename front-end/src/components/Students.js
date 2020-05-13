import React from 'react';
import Header from './Header';
import StudentSideList from './StudentSideList';
import StudentItem from './StudentItem';
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

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

class Students extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedStudent: '',
      students: [],
      education: [],
      work: [],
      searchStudent: [],
      currentPageNumber: 1
    };
  }

  componentDidMount() {

  }

  onSkillSearch = list => {
    this.setState({ searchStudent: list });
  };

  books = () => {
    
  }

  render() {
    console.log(this.props.data.students)
    return (
      <div>
        <Header />
        <div className='ui segment' style={{ marginTop: '0px', paddingLeft: '40px' }}>
          <b>
            <h3>Explore Students</h3>
          </b>
        </div>
        <div className='container' style={{ marginLeft: '40px', marginTop: '30px' }}>
          <div style={{ float: 'left', width: '25%', marginLeft: '30px' }}>
            <StudentSideList />
          </div>
          <div style={{ float: 'left', marginLeft: '15px', width: '65%' }}>
            <div>
              {this.props.data.students && this.props.data.students.map(student => {
                return (
                  <div className='ui raised segment' style={{ height: '110px', marginBottom: '20px' }}>
                    <StudentItem key={student._id} student={student} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default graphql(getStudentsQuery)(Students)
