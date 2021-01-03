import LoginCard from './LoginCards';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DisplayMessage from './DisplayMessage/displayMessage';
import { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function Login(props) {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	// Get from store
	const status = 'Active';
	const validateValue = (cardHeader, fieldValue) => {
		console.log(cardHeader, fieldValue);
		if (cardHeader === 'Username') {
			//regex validation
			if (fieldValue.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
				//api call
				const checkUserNameExists = async () => {
					try {
						const response = await axios.post(
							'https://f2066c2c-3359-41dd-a269-a14d820ac25a.mock.pstmn.io/tempmockserver/userexists',
							{
								username: fieldValue,
							}
						);
						if (response.status === 200) {
							console.log(response.data);
							// dispatch to store
							setUserName(fieldValue);
						} else {
							console.log('Something went wrong username');
						}
					} catch (error) {
						console.log(error);
					}
				};
				checkUserNameExists();
			} else {
				setErrorMessage('Please enter a valid email id');
			}
		} else if (cardHeader === 'Password') {
			const loginAPICall = async () => {
				try {
					const response = await axios.post(
						'https://f2066c2c-3359-41dd-a269-a14d820ac25a.mock.pstmn.io/tempmockserver/login',
						{
							username: userName,
							password: fieldValue,
						}
					);
					if (response.status === 200) {
						console.log(response.data);
						// dispatch to store
						setPassword(fieldValue);
					} else {
						console.log('Password is incorrect/ Something went wrong pswd');
					}
				} catch (error) {
					console.log(error);
				}
			};
			loginAPICall();
		}
	};
	return (
		<div>
			<Header />

			{!userName ? (
				<LoginCard
					cardHeader="Username"
					cardType="text"
					errorMessage={errorMessage}
					buttonText="Next"
					onSubmit={validateValue}
				/>
			) : status === 'Active' && !password ? (
				<LoginCard cardHeader="Password" cardType="password" buttonText="Submit" onSubmit={validateValue} />
			) : status === 'Pending' ? (
				<DisplayMessage message="Pending" />
			) : status === 'Inactive' ? (
				<DisplayMessage message="Inactive" />
			) : status === 'Active' && password ? (
				<Redirect to={'/dashboard'} />
			) : (
				<DisplayMessage message="User does not exist" />
			)}

			{/* <LoginCard cardHeader="Password" cardType="new password" buttonText="Save password" /> */}
			{/* <LoginCard cardHeader="OTP" cardType="text" buttonText="Submit" /> */}

			<Footer />
		</div>
	);
}
