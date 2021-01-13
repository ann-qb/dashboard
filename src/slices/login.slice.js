import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseRedirectURL, baseURL } from '../config/constants';
import fetch from './../utils/axios';

const initialState = { verifiedUser: null, loggedUser: null, role: null, status: 'idle', errorMessage: '' };

const loginSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login(state, action) {
			state.loggedUser = action.payload.loggedUser;
			state.role = action.payload.role;
			state.status = 'success';
			localStorage.setItem('currentUser', JSON.stringify({ loggedUser: state.loggedUser, role: state.role }));
		},
		logout(state) {
			state = initialState;
			localStorage.removeItem('currentUser');
			return state;
		},
		resetStatus(state) {
			state.status = 'idle';
		},
		updateStatus(state, action) {
			state.status = action.payload.status;
		},
		updateVerifiedUser(state, action) {
			state.verifiedUser = action.payload.verifiedUserStatus;
			state.status = 'success';
		},
		updateErrorMessage(state, action) {
			state.errorMessage = action.payload.errorMessage;
			state.status = 'success';
		},
	},
});

export const { login, logout, resetStatus, updateStatus, updateVerifiedUser, updateErrorMessage } = loginSlice.actions;
export default loginSlice.reducer;

export const onVerifyUserName = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// dispatch loading start
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch fetch API
	try {
		const response = await axios.post(`${baseURL}/user/check`, {
			email: data.userName,
		});
		if (response.status === 200) {
			console.log(response.data);
			// dispatch to store
			const status = response.data.message;
			if (status === 'pending') {
				dispatch(updateVerifiedUser({ verifiedUserStatus: 'pending' }));
			} else if (status === 'user exist') {
				dispatch(updateVerifiedUser({ verifiedUserStatus: 'active' }));
			}
			// else if (status === 'inactive') {
			// 	dispatch(updateVerifiedUser({ verifiedUserStatus: 'inactive' }));
			// }
		} else {
			console.log('Something went wrong while checking username!');
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 400) {
			console.log(error.response.data);
			dispatch(updateVerifiedUser({ verifiedUserStatus: 'nonexistant' }));
		} else if (error?.response?.status === 403) {
			console.log(error.response.data);
			dispatch(updateVerifiedUser({ verifiedUserStatus: 'inactive' }));
		}
	}
	// dispatch(resetStatus()); // to indicate API call is over
};

export const onLogin = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// dispatch loading start
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch fetch API
	try {
		const response = await axios.post(`${baseURL}/user/login`, {
			email: data.userName,
			password: data.password,
		});
		if (response.status === 200) {
			console.log(response.data);
			// dispatch to store
			dispatch(login(response.data.data));
		} else {
			console.log('Something went wrong during login attempt!');
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 401) {
			console.log('Incorrect password');
			dispatch(updateErrorMessage({ errorMessage: 'Incorrect password' }));
		}
	}
	// dispatch(resetStatus()); // to indicate API call is over
};

export const onLogout = () => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// dispatch loading start
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch fetch API
	try {
		const response = await fetch.post(`${baseURL}/user/logout`);
		if (response.status === 200) {
			console.log(response.data);
			// dispatch to store
			dispatch(logout());
		} else {
			console.log('Something went wrong while logging out!');
		}
	} catch (error) {
		console.log(error);
	}
	dispatch(resetStatus()); // to indicate API call is over
};

export const onSetPassword = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// dispatch loading start
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch fetch API
	try {
		const response = await axios.put(`${baseURL}/user/password?${data.query}`, {
			password: data.password,
		});
		console.log(response);
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'success' }));
			dispatch(login(response.data));
		} else {
			console.log('Something went wrong while setting the password.');
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
	}
	dispatch(resetStatus()); // to indicate API call is over
};

export const onForgotPassword = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// dispatch loading start
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch fetch API
	try {
		const response = await axios.put(`${baseURL}/user/password/forgot`, {
			email: data.email,
			link: `${baseRedirectURL}/user/set-password`,
		});
		console.log(response);
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'success' }));
			// email sent msg
			dispatch(updateStatus({ status: 'password reset email sent' }));
		} else {
			console.log('Something went wrong with the forgot password request.');
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
	}
	dispatch(resetStatus()); // to indicate API call is over
};
