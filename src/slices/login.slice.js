import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { verifiedUser: null, loggedUser: null, role: null, status: 'idle', errorMessage: '' };

const loginSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login(state, action) {
			state.loggedUser = action.payload.loggedUser;
			state.role = action.payload.role;
            state.status = 'success';
            if(!localStorage.getItem('currentUser')) {
                localStorage.setItem('currentUser', JSON.stringify({ loggedUser: state.loggedUser, role: state.role }));
                // Handle reset token expiry
            }
		},
		logout(state) {
			state = initialState;
			localStorage.removeItem('currentUser');
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
	dispatch(updateStatus('loading'));
	// try-catch fetch API
	try {
		const response = await axios.post('http://localhost:3000/user/check', {
			email: data.userName,
		});
		if (response.status === 200) {
			console.log(response.data);
			// dispatch to store
			if (response.data === 'pending') {
				dispatch(updateVerifiedUser({ verifiedUserStatus: 'pending' }));
			} else if (response.data === 'user exist') {
				dispatch(updateVerifiedUser({ verifiedUserStatus: 'active' }));
			} else if (response.data === 'inactive') {
				dispatch(updateVerifiedUser({ verifiedUserStatus: 'inactive' }));
			}
		} else {
			console.log('Something went wrong while checking username!');
			dispatch(updateStatus('success')); // to indicate API call was a success
		}
	} catch (error) {
		console.log(error);
		if (error.response.status === 400) {
			console.log(error.response.data);
			dispatch(updateVerifiedUser({ verifiedUserStatus: 'nonexistant' }));
		}
	}
	// dispatch loading end - not necessary as it's handled by the other actions dispatched
	// update status - not necessary as it's handled by the other actions dispatched
};

export const onLogin = (data) => async (dispatch) => {
    console.log(data)
	// reset
	dispatch(resetStatus());
	// dispatch loading start
	dispatch(updateStatus('loading'));
	// try-catch fetch API
	try {
		const response = await axios.post(
			'http://localhost:3000/user/login',
			{
				email: data.userName,
				password: data.password,
			}
		);
		if (response.status === 200) {
			console.log(response.data);
			// dispatch to store
			dispatch(login(response.data));
		} else {
			console.log('Something went wrong during login attempt!');
			dispatch(updateStatus('success')); // to indicate API call was a success
		}
	} catch (error) {
		console.log(error);
		if (error.response.status === 401) {
			console.log('Incorrect password');
			dispatch(updateErrorMessage({errorMessage: 'Incorrect password'}));
		}
	}
	// dispatch loading end - not necessary as it's handled by the other actions dispatched
	// update status - not necessary as it's handled by the other actions dispatched
};

export const onLogout = (data) => async (dispatch, getState) => {
	const state = getState();
	console.log(state);
	// reset
	dispatch(resetStatus());
	// dispatch loading start
	dispatch(updateStatus('loading'));
	// try-catch fetch API
	try {
		const response = await axios.post('http://localhost:3000/user/logout', {
			token: state.loginSlice.loggedUser.token,
		});
		if (response.status === 200) {
			console.log(response.data);
			// dispatch to store
			dispatch(logout());
		} else {
			console.log('Something went wrong while logging out!');
			dispatch(updateStatus('success')); // to indicate API call was a success
		}
	} catch (error) {
		console.log(error);
		dispatch(updateStatus('success')); // to indicate API call was a success
	}
};
