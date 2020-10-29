import React from "react";
import Message from './Message';
import "../css/App.scss";
import "../css/Messages.scss";
import { withRouter } from "react-router-dom";

class Messages extends React.Component {
    componentDidUpdate() {
        // get the messagelist container and set the scrollTop to the height of the container
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    
    render() {
        // Loop through all the messages in the state and create a Message component
        const messages = this.props.messages.map((message, i) => {
            return (
                <Message
                    key={i}
                    username={message.username}
                    message={message.message}
                    fromMe={message.fromMe} />
            );
        });
        return (
            <div className='messages' id='messageList'>
                { messages}
            </div>
        );
    }
}
export default withRouter(Messages);