import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../config/constants';
import fetch from '../utils/axios';

const initialState = { productList: [], status: 'idle' };

const productListSlice = createSlice({
	name: 'productList',
	initialState,
	reducers: {
		storeProductList(state, action) {
			const productListArray = action.payload.productList.reverse();
			state.productList = productListArray;
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

export const { storeProductList, resetStatus, updateStatus } = productListSlice.actions;
export default productListSlice.reducer;

export const onGetProductList = () => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading product list' }));
	// try-catch // storeProductList
	try {
		const response = await fetch.get(`${baseURL}/product`);
		console.log(response);
		if (response.status === 200) {
			dispatch(storeProductList({ productList: response.data.data }));
		} else {
			console.log('Failed to fetch product list');
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
	}
	// end loading
	dispatch(updateStatus({ status: 'loading product list over' }));
	// reset
	dispatch(resetStatus());
};

export const onAddProduct = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetProductList
	try {
		const response = await fetch.post(`${baseURL}/product/create`, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		console.log(response);
		if (response.status === 201) {
			dispatch(updateStatus({ status: 'add product success' }));
			dispatch(onGetProductList());
			// notification display
		} else {
			console.log('Something went wrong while adding new product.');
			dispatch(updateStatus({ status: 'add product failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		console.log(error.response.data.message);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'add product failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onEditProduct = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetProductList
	try {
		const response = await fetch.patch(`${baseURL}/product/${data.productId}`, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'edit product success' }));
			dispatch(onGetProductList());
			// notification display
		} else {
			console.log('Something went wrong while editing product details.');
			dispatch(updateStatus({ status: 'edit product failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'edit product failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onDeleteProduct = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetProductList
	try {
		const response = await fetch.delete(`${baseURL}/product/${data.productId}`);
		console.log(response);
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'delete product success' }));
			dispatch(onGetProductList());
			// notification display
		} else {
			console.log('Something went wrong while deleting product.');
			dispatch(updateStatus({ status: 'delete product failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'delete product failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};
