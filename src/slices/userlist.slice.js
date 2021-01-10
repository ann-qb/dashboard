import { createSlice } from '@reduxjs/toolkit';
import fetch from './../utils/axios';

const initialState = { userList: [], status: 'idle' };

const userListSlice = createSlice({
	name: 'userlist',
	initialState,
	reducers: {
		storeUserList(state, action) {
			state.userList = action.payload.userList;
			state.status = 'success';
		},
		resetStatus(state) {
			state.status = 'idle';
		},
		updateStatus(state, action) {
			state.status = action.payload.status;
		},
	},
});

export const { storeUserList, resetStatus, updateStatus } = userListSlice.actions;
export default userListSlice.reducer;

export const onGetUserList = () => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // storeUserList
	try {
		const response = await fetch.get('http://localhost:3000/user');
		if (response.status === 200) {
			dispatch(storeUserList({ userList: response.data }));
		} else {
			console.log('Failed to fetch user list');
		}
	} catch (error) {
		console.log(error);
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onAddUser = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetUserList
	try {
		const response = await fetch.post('http://localhost:3000/user', {
			...data.userData,
			role: 'user',
			link: 'http://localhost:3000/user/set-password',
		});
		console.log(response);
		if (response.status === 201) {
			dispatch(updateStatus({ status: 'add user success' }));
			dispatch(onGetUserList());
			// notification display
		} else {
			console.log('Something went wrong while adding new user.');
			dispatch(updateStatus({ status: 'add user failed' }));
		}
	} catch (error) {
		// 400 bad request for non-unique email ids - consider custom error notifications
		console.log(error);
		console.log(error.response);
		console.log(error.response.data.message);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'add user failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onEditUser = (data) => async (dispatch, getState) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	const state = getState();
	// try-catch // onGetUserList
	try {
		const response = await fetch.put(
			state.loginSlice.role === 'admin' ? `http://localhost:3000/user/${data.id}` : 'http://localhost:3000/user',
			{
				...data.userData,
			}
		);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'edit user success' }));
			dispatch(onGetUserList());
			// notification display
		} else {
			console.log('Something went wrong while editing user details.');
			dispatch(updateStatus({ status: 'edit user failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		// 404 error - put not post
		// 400 - pending status, validation isAlpha
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'edit user failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onDeleteUser = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetUserList
	try {
		const response = await fetch.delete(`http://localhost:3000/user/delete/${data.id}`);
		console.log(response);
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'delete user success' }));
			dispatch(onGetUserList());
			// notification display
		} else {
			console.log('Something went wrong while deleting user.');
			dispatch(updateStatus({ status: 'delete user failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'delete user failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};
