import LoginCard from '../Login/LoginCards';
import { useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onSetPassword } from '../../slices/login.slice';
import { useDispatch, useSelector } from 'react-redux';

export default function SetPasswordPage(props) {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	console.log(location);
	const [showLoading, setShowLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [disableSubmit, setDisableSubmit] = useState(true);
	const [password, setPassword] = useState('');

	const { status } = useSelector((state) => state.loginSlice);
	useEffect(() => {
		status === 'loading' ? setShowLoading(true) : setShowLoading(false);
		if (status === 'success') {
			history.replace('/dashboard');
		}
	}, [status]);

	// Methods
	const useQuery = () => {
		return new URLSearchParams(location.search);
	};
	let query = useQuery();

	const onHandlePasswordChange = (e) => {
		const value = e.target.value;
		setPassword(value);
		password.trim().length ? setDisableSubmit(false) : setDisableSubmit(true);
	};

	const submitPassword = () => {
		dispatch(onSetPassword({ password, query }));
	};

	// Query data
	const action = query.get('action');
	const token = query.get('token');
	console.log(location.search);
	return (
		<div id="login_background">
			<LoginCard
				cardHeader="Password"
				cardType="new password"
				onChange={onHandlePasswordChange}
				errorMessage={errorMessage}
				buttonDisabled={disableSubmit}
				buttonText="Submit"
				onClick={submitPassword}
				loading={showLoading}
			/>
		</div>
	);
}
