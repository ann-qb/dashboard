import { createSlice } from '@reduxjs/toolkit';

const initialState = { verifiedUser: null, loggedUser: null, role: null, status: 'idle' };

const loginSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login(state, action) {
			state.loggedUser = action.payload.loggedUser;
			state.role = action.payload.role;
			state.status = 'success';
		},
		logout(state) {
			state = initialState;
		},
		resetStatus(state) {
			state.status = 'idle';
		},
		updateStatus(state, action) {
			state.status = action.payload.status;
		},
	},
});

export const { login, logout, reset, updateStatus } = loginSlice.actions;
export default loginSlice.reducer;

export const onLogin = (data) => async (dispatch) => {
	// reset
	dispatch(reset());
	// dispatch loading start
	dispatch(updateStatus('loading'));
	// try-catch fetch API

	// dispatch loading end
	// update status
};
export const onVerifyUserName = (data) => (dispatch) => {
	// reset
	dispatch(reset());
	// dispatch loading start
	dispatch(updateStatus('loading'));
	// try-catch fetch API

	// dispatch loading end
	// update status
};
