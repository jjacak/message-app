import React from 'react';
import MessageForm from './MessageForm';
import Inbox from './Inbox';

const MessagePanel = (props) => {
	return (
		<React.Fragment>
			<MessageForm currentUser={props.currentUser}/>
			<Inbox currentUser={props.currentUser}/>
		</React.Fragment>
	);
};

export default MessagePanel;
