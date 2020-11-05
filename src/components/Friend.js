import React from 'react';

class Friend extends React.Component {
  render() {
    

    return (
      <div className='friend'>
        <div className='username'>
          { this.props.username }
        </div>
        <div className='fname'>
          { this.props.fname }
        </div>
        <div className='lname'>
          { this.props.lname }
        </div>
      </div>
    );
  }
}

Friend.defaultProps = {
  username: '',
  fname: '',
  lname: ''
};

export default Friend;