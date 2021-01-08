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

export const onGetUserList = (data) => async(dispatch) => {
    // reset
    dispatch(resetStatus());
    // loading
    dispatch(updateStatus({ status: 'loading' }));
    // try-catch // storeUserList
    try {
        const response = await fetch.get('http:// localhost:3000/user');
        console.log(response);
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

export const onAddUser = (data) => (dispatch) => {
    // reset
    // loading
    // try-catch // onGetUserList
    // end loading
    // reset
};

export const onEditUser = (data) => (dispatch) => {
    // reset
    // loading
    // try-catch // onGetUserList
    // end loading
    // reset
};

export const onDeleteUser = (data) => (dispatch) => {
    // reset
    // loading
    // try-catch // onGetUserList
    // end loading
    // reset
};