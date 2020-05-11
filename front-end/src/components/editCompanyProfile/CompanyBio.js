import React from 'react';
import axios from 'axios';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import Button2 from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

class CompanyBio extends React.Component {
  constructor() {
    super();
    this.state = { selectedFile: null, img: '' };
  }

  useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      }
    },
    input: {
      display: 'none'
    }
  }));

  componentDidMount() {
    this.setState({ img: this.props.bio.company_logo });
  }

  onSaveImage = () => {
    const id = 16;
    const fd = new FormData();
    console.log('uploading...');
    fd.append('upl', this.state.selectedFile);
    axios
      .post(`http://18.206.154.118:8080/api/student/upload/${id}`, fd)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            img: 'https://test-handshake.s3.amazonaws.com/profile_' + id
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onFileSelect = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  renderModal = () => {
    return (
      <Modal
        trigger={
          <label htmlFor='icon-button-file'>
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='span'
            >
              <PhotoCamera />
            </IconButton>
          </label>
        }
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size='medium'
            src='https://react.semantic-ui.com/images/avatar/large/rachel.png'
          />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
            <input
              accept='image/*'
              className={this.useStyles.input}
              id='contained-button-file'
              multiple
              type='file'
              onChange={this.onFileSelect}
            />
            <label htmlFor='contained-button-file'>
              <Button2 variant='contained' color='primary' component='span'>
                Upload
              </Button2>
            </label>
            <div style={{ marginTop: '27%' }}>
              <Button2
                variant='contained'
                color='primary'
                style={{ marginRight: '10px' }}
                onClick={this.onSaveImage}
              >
                Save
              </Button2>
              <Button2 variant='contained'>Cancel</Button2>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  };

  render() {
    return (
      <div class='ui raised cards'>
        <div class='card'>
          <div
            className='ui small circular centered middle aligned image'
            style={{ paddingTop: '15px', paddingBottom: '15px' }}
          >
            <img src={this.state.img} style={{ borderRadius: '50%' }} />
            {this.renderModal()}
          </div>
          <div class='content'>
            <i className='pencil alternate icon' style={{ float: 'right' }}></i>
            <div class='header'>{this.props.bio.company_name}</div>
            <div class='meta'></div>
            <div class='description'>
              {this.props.bio.company_email_id}
              <br></br>
              Location: {this.props.bio.company_location}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyBio;
