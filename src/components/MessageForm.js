import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import Autocomplete from './Autocomplete';
import useHttp from '../hooks/use-http';

const MessageForm = (props) => {
	const { isLoading, error, sendRequest: sendMessage } = useHttp();
	const [recipient, setRecipient] = useState('');
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [formInvalid, setFormInvalid] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const resetForm = () => {
		if (didSubmit) {
			setDidSubmit(false);
		}
	};

	const getRecipient = (val) => {
		setRecipient(val);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (
			message.trim().length < 1 ||
			recipient.trim().length < 1 ||
			title.trim().length < 1
		) {
			setFormInvalid(true);
			return;
		}
		const getResponse = (data) => {
			setDidSubmit(true);
			setMessage('');
			setTitle('');
			setRecipient('');
		};
		sendMessage(
			{
				url: 'http://localhost:5500/send',
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: {
					recipient: recipient,
					sender: props.currentUser,
					title: title,
					content: message,
					date: new Date().toISOString().substring(0, 10),
				},
			},
			getResponse
		);
	};
	return (
		<Form
			className="shadow mt-3 mx-auto p-3"
			style={{ maxWidth: '600px' }}
			onSubmit={submitHandler}
		>
			<h3 className="text-center">Send a message</h3>
			<Form.Group>
				<Form.Label>To:</Form.Label>
				<Autocomplete id="recipient" name="recipient" onChange={getRecipient} onFocus={resetForm} value={recipient}/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label htmlFor="title" onFocus={resetForm}>
					Title:
				</Form.Label>
				<Form.Control
					type="text"
					name="title"
					id="title"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label htmlFor="content">Message:</Form.Label>
				<Form.Control
					onChange={(e) => setMessage(e.target.value)}
                    onFocus={resetForm}
					value={message}
					type="text"
					name="content"
					id="content"
					as="textarea"
					style={{ height: '120px' }}
				/>
			</Form.Group>
			{formInvalid && <p className="text-danger">All fields are required.</p>}
			{didSubmit && <p className="text-success">Message sent.</p>}
			<Button variant="dark" type="submit">
				{isLoading ? 'Sending' : 'Send'}
			</Button>
		</Form>
	);
};

export default MessageForm;
