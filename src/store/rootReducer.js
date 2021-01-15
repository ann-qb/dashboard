import loginSlice from './../slices/login.slice';
import userListSlice from './../slices/userlist.slice';
import categoryListSlice from './../slices/categorylist.slice';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
    loginSlice,
    userListSlice,
    categoryListSlice,
});