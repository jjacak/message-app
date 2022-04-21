import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
	userName: yup.string('Invalid name!').required('This field is required.'),
});

const Login = (props) => {
	return (
		<div className="d-flex vh-100 justify-content-center align-items-start mt-5">
			<Formik
				validationSchema={schema}
				onSubmit={(val) => {
					props.onSubmit(val.userName);
				}}
				initialValues={{
					userName: '',
				}}
			>
				{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					isValid,
					errors,
				}) => (
					<Form noValidate onSubmit={handleSubmit} className="shadow">
						<Form.Group md="4">
							<div className="input-group">
								<FloatingLabel label="Enter your name">
									<Form.Control
										type="text"
										name="userName"
										id="userName"
										value={values.userName}
										onChange={handleChange}
										isValid={touched.userName && !errors.userName}
										placeholder="Enter your name"
										isInvalid={touched.userName && !!errors.userName}
									/>
								</FloatingLabel>
								<Button variant="dark" type="submit">
									Confirm
								</Button>
							</div>
							{/* <ErrorMessage
								name="userName"
								component="div"
								className="px-3 mt-1"
							/> */}
						</Form.Group>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Login;
