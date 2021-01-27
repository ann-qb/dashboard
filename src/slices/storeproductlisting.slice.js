import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../config/constants';
import fetch from '../utils/axios';

const initialState = { productListing: [], status: 'idle' };

const storeProductListingSlice = createSlice({
	name: 'storeProductListing',
	initialState,
	reducers: {
		storeProductListing(state, action) {
			state.productListing = action.payload.productListing;
			state.status = 'success';
		},
		updateProductListing(state, action) {
			state.productListing.append(action.payload.productListing);
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

export const { storeProductListing, resetStatus, updateStatus } = storeProductListingSlice.actions;
export default storeProductListingSlice.reducer;

export const onGetStoreProductListing = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading product listing' }));
	// try-catch // storeProductListing
	try {
		const response =
			data.subCategory === undefined
				? await fetch.get(`${baseURL}/product?category=${data.category}&range=16`)
				: await fetch.get(`${baseURL}/product?subcategory=${data.subCategory}&range=16`);
		console.log(response);
		if (response.status === 200) {
			dispatch(storeProductListing({ productListing: response.data.data }));
		} else {
			console.log('Failed to fetch product listing');
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
	}
	// end loading
	dispatch(updateStatus({ status: 'loading product listing over' }));
	// reset
	dispatch(resetStatus());
};
