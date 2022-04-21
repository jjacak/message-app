import { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Login from './components/Login';
import Brand from './components/Brand';
import MessagePanel from './components/MessagePanel';

function App() {
	const [userName, setUserName] = useState(null);
	const getUserName = (name) => {
		setUserName(name);
	};
	return (
		<div className="App">
			<Brand />
			<Container>
				{!userName && <Login onSubmit={getUserName} />}
				{userName && <MessagePanel currentUser = {userName}/>}
			</Container>
		</div>
	);
}

export default App;
