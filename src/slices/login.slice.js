import { createSlice } from '@reduxjs/toolkit';

const initialState = { loggedIn: false };

const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state) {
            state.loggedIn = true;
        },
        logout(state) {
            state.loggedIn = false;
        },
    },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;