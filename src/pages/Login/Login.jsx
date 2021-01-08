import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import LoginCard from './LoginCards';
import DisplayMessage from './DisplayMessage/displayMessage';
import { onLogin, onVerifyUserName, resetStatus, updateErrorMessage } from './../../slices/login.slice';

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
			dispatch(onLogin(currentUser));
		}
	}, []);

	useEffect(() => {
		if ((status === 'idle' || status === 'success') && loggedUser !== null) {
			dispatch(resetStatus());
			dispatch(updateErrorMessage({errorMessage: ''}))
			history.replace(location?.state?.from || '/dashboard');
		}
	}, [status, loggedUser]);

	// useEffect(() => {
	// if (status === 'idle' && loggedUser) {
	// history.replace('/dashoard');
	// }
	// }, [status, loggedUser]);

	useEffect(() => {
		status === 'loading' ? setShowLoading(true) : setShowLoading(false);
	}, [status]);

	// optimize
	// for username/password/display message rendering
	useEffect(() => {
		if (status === 'success' && verifiedUser === 'active') {
			setShowUsername(false);
			setShowPassword(true);
			setDisplayMessage(false);
			setMessage('');
			// setdisableSubmit(false);
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
			// message = 'User account status is INACTIVE. Please contact the admin for further details.';
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
			console.log(password);
			console.log(password.length);
			if (password.length) {
				console.log(password);
				dispatch(onLogin({ userName, password }));
			}
		}
	};

	const onHandleUserNameChange = (e) => {
		const value = e.target.value;
		setUserName(value);
		userName.trim.length ? setDisableSubmit(false) : setDisableSubmit(true);
	};

	const onHandlePasswordChange = (e) => {
		const value = e.target.value;
		setPassword(value);
		password.trim.length ? setDisableSubmit(false) : setDisableSubmit(true);
	};

	return (
		<div>
			{showUsername ? (
				<LoginCard
					cardHeader="Username"
					cardType="text"
					value={userName}
					onChange={onHandleUserNameChange}
					errorMessage={error}
					sideLinkText="New User?"
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
					buttonText="Submit"
					buttonDisabled={disableSubmit}
					onClick={validateSubmit}
					loading={showLoading}
				/>
			) : null}
			{displayMessage ? <DisplayMessage message={message} /> : null}
		</div>
	);
}
