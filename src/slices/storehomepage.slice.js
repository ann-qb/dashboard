import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../config/constants';
import fetch from '../utils/axios';

const initialState = { homePageData: [], status: 'idle' };

const homePageDataSlice = createSlice({
	name: 'homePageData',
	initialState,
	reducers: {
		storeHomePageData(state, action) {
			const homePageDataArray = action.payload.homePageData.reverse();
			state.homePageData = homePageDataArray;
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

export const { storeHomePageData, resetStatus, updateStatus } = homePageDataSlice.actions;
export default homePageDataSlice.reducer;

export const onGetHomePageData = () => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading home page data' }));
	// try-catch // storeHomePageData
	try {
		const response = await fetch.get(`${baseURL}/product/home`);
		console.log(response);
		if (response.status === 200) {
			dispatch(storeHomePageData({ homePageData: response.data.data }));
		} else {
			console.log('Failed to fetch home page data');
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
	}
	// end loading
	dispatch(updateStatus({ status: 'loading home page data over' }));
	// reset
	dispatch(resetStatus());
};