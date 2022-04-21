import { useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { Card } from 'react-bootstrap';

const Inbox = (props) => {
	const [messages, setMessages] = useState([]);
	const { isLoading, error, sendRequest: fetchMessages } = useHttp();

	const displayMessages = (data) => {
		setMessages(data.messages);
	};
	const getMessages = fetchMessages.bind(
		null,
		{
			url: 'http://localhost:5500/messages',
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: { user: props.currentUser },
		},
		displayMessages
	);

	useEffect(() => {
		getMessages();
		const interval = setInterval(() => {
			getMessages();
		}, 1000 * 60 * 5);

		return () => clearInterval(interval);
	}, []);

	return (
		<div >
            <h2 className='my-3 text-center'>Inbox</h2>
			<div className='row justify-content-center'>
            {messages.map((m) => {
				return (
					<Card key={m._id} className='shadow m-2 col-lg-6'>
						<Card.Header className='d-flex justify-content-between'><span>Message from : {m.sender}</span><span className='text-muted'>{m.date}</span></Card.Header>
						<Card.Body>
							<Card.Title>{m.title}</Card.Title>
							<Card.Text>{m.content}</Card.Text>
						</Card.Body>
					</Card>
				);
			})}
            </div>
		</div>
	);
};
export default Inbox;
