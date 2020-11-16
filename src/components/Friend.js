import React from 'react';
import "../css/App.scss";

class Friend extends React.Component {
  render() {
    

    return (
      <div className='friend'>
        <div className='username'>
          { this.props.fname } { this.props.lname }
        </div>
        {/* <div className='fname'>
          { this.props.fname }
        </div>
        <div className='lname'>
          { this.props.lname }
        </div>
        <div className='lname'>
          { this.props.email }
        </div> */}
      </div>
    );
  }
}

Friend.defaultProps = {
  username: '',
  fname: '',
  lname: '',
  email: ''
};

export default Friend;