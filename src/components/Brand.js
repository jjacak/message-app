import { Navbar, Container } from 'react-bootstrap';
import { MailIcon } from '@primer/octicons-react';

const Brand = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">
					<MailIcon size ='medium'/>{' '}
					<h3 className='d-inline'>TaskFour</h3>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Brand;
