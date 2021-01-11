import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import LoginCard from './LoginCards';
import DisplayMessage from './DisplayMessage/displayMessage';
import {
	login,
	onForgotPassword,
	onLogin,
	onVerifyUserName,
	resetStatus,
	updateErrorMessage,
} from './../../slices/login.slice';

export default function Login() {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();

	const [showUsername, setShowUsername] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [displayMessage, setDisplayMessage] = useState(false);

	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [disableSubmit, setDisableSubmit] = useState(true);
	const [showLoading, setShowLoading] = useState(false);
	const [message, setMessage] = useState('');

	const { loggedUser, status, verifiedUser, errorMessage } = useSelector((state) => state.loginSlice);

	useEffect(() => {
		const currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUser !== null) {
			dispatch(login(currentUser));
			dispatch(resetStatus());
		}
	}, []);

	useEffect(() => {
		if (status === 'idle' && loggedUser !== null) {
			dispatch(resetStatus());
			dispatch(updateErrorMessage({ errorMessage: '' }));
			history.replace(location?.state?.from || '/dashboard');
		}
	}, [status, loggedUser]);

	useEffect(() => {
		status === 'loading' ? setShowLoading(true) : setShowLoading(false);
		if (status === 'password reset email sent') {
			setMessage('A link to reset the password has been sent to your registered email id');
			setShowUsername(false);
			setShowPassword(false);
			setDisplayMessage(true);
		}
	}, [status]);

	// for username/password/display message rendering
	useEffect(() => {
		if (status === 'success' && verifiedUser === 'active') {
			setShowUsername(false);
			setShowPassword(true);
			setDisplayMessage(false);
			setMessage('');
			dispatch(resetStatus());
		} else if (status === 'success' && verifiedUser === 'pending') {
			setMessage(
				'User account status is PENDING. Please follow the instructions in the email sent to your registered email id to login.'
			);
			setShowUsername(false);
			setShowPassword(false);
			setDisplayMessage(true);
			dispatch(resetStatus());
		} else if (status === 'success' && verifiedUser === 'inactive') {
			setMessage('User account status is INACTIVE. Please contact the admin for further details.');
			setShowUsername(false);
			setShowPassword(false);
			setDisplayMessage(true);
			dispatch(resetStatus());
		} else if (status === 'success' && verifiedUser === 'nonexistant') {
			setMessage('User account not found.');
			setShowUsername(false);
			setShowPassword(false);
			setDisplayMessage(true);
			dispatch(resetStatus());
		}
	}, [status, verifiedUser]);

	const validateSubmit = () => {
		//for username
		if (showUsername && !showPassword) {
			const emailPattern = new RegExp('^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$', 'g');
			if (userName.match(emailPattern)) {
				dispatch(onVerifyUserName({ userName }));
			} else {
				setError('This email id is not valid');
			}
		}

		// for password
		if (!showUsername && showPassword) {
			if (password.trim().length) {
				dispatch(onLogin({ userName, password }));
			}
		}
	};

	const onHandleUserNameChange = (e) => {
		const value = e.target.value;
		setUserName(value);
		value.trim().length ? setDisableSubmit(false) : setDisableSubmit(true);
	};

	const onHandlePasswordChange = (e) => {
		const value = e.target.value;
		if (value !== undefined) {
			console.log(value);
			setPassword(value);
		}
		password.trim().length ? setDisableSubmit(false) : setDisableSubmit(true);
	};

	// Side link buttons
	const displayNewUserMessage = () => {
		setMessage('Please check your inbox to find a mail with login instructions or contact admin');
		setShowUsername(false);
		setShowPassword(false);
		setDisplayMessage(true);
	};

	const generatePasswordResetEmail = () => {
		// API call to generate link
		dispatch(onForgotPassword({ email: userName }));
		// displayForgotPasswordMessage();
	};

	// const displayForgotPasswordMessage = () => {
	// 	setMessage('A link to reset the password has been sent to your registered email id');
	// 	setShowUsername(false);
	// 	setShowPassword(false);
	// 	setDisplayMessage(true);
	// };

	const takeBackToLoginFromDisplayMessage = () => {
		setMessage('');
		setUserName('');
		setShowUsername(true);
		setDisableSubmit(true);
		setShowPassword(false);
		setDisplayMessage(false);
	};

	return (
		<div id="login_background">
			{showUsername ? (
				<LoginCard
					cardHeader="Username"
					cardType="text"
					value={userName}
					onChange={onHandleUserNameChange}
					errorMessage={error}
					sideLinkText="New User?"
					sideLinkOnClick={displayNewUserMessage}
					buttonText="Next"
					buttonDisabled={disableSubmit}
					onClick={validateSubmit}
					loading={showLoading}
				/>
			) : null}
			{showPassword ? (
				<LoginCard
					cardHeader="Password"
					cardType="password"
					value={password}
					onChange={onHandlePasswordChange}
					errorMessage={errorMessage}
					sideLinkText="Forgot password?"
					sideLinkOnClick={generatePasswordResetEmail}
					buttonText="Submit"
					buttonDisabled={disableSubmit}
					onClick={validateSubmit}
					loading={showLoading}
				/>
			) : null}
			{displayMessage ? <DisplayMessage message={message} onClick={takeBackToLoginFromDisplayMessage} /> : null}
		</div>
	);
}
