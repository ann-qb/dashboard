import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../config/constants';
import fetch from '../utils/axios';

const initialState = { productList: [], status: 'idle', totalPages: 1 };

const productListSlice = createSlice({
	name: 'productList',
	initialState,
	reducers: {
		storeProductList(state, action) {
			state.productList = action.payload.rows;
			state.totalPages = action.payload.totalPages;
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

export const onGetProductList = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading product list' }));
	// try-catch // storeProductList
	try {
		const response = await fetch.get(`${baseURL}/product?page=${data.currentPage}&range=16`);
		console.log(response);
		if (response.status === 200) {
			dispatch(storeProductList({ ...response.data.data }));
		} else {
			console.log('Failed to fetch product list');
		}

		// end loading
		dispatch(updateStatus({ status: 'loading product list over' }));
		// reset
		dispatch(resetStatus());
	} catch (error) {
		console.log(error);
		console.log(error.response);
		// end loading
		dispatch(updateStatus({ status: 'loading product list failed' }));
		// reset
		dispatch(resetStatus());
	}
};

export const onAddProduct = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'adding product...' }));
	// try-catch // onGetProductList
	try {
		const response = await fetch.post(`${baseURL}/product/create`, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		console.log(response);
		if (response.status === 201) {
			dispatch(updateStatus({ status: 'add product success' }));
			dispatch(onGetProductList({ currentPage: 1 }));
			// notification display
		} else {
			console.log('Something went wrong while adding new product.');
			dispatch(updateStatus({ status: "Sorry, couldn't add product" }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		console.log(error.response.data.message);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: "Sorry, couldn't add product" }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onEditProduct = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'Editing product...' }));
	// try-catch // onGetProductList
	try {
		const response = await fetch.patch(`${baseURL}/product/${data.productId}`, data.formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'edit product success' }));
			dispatch(onGetProductList({ currentPage: 1 }));
			// notification display
		} else {
			console.log('Something went wrong while editing product details.');
			dispatch(updateStatus({ status: "Sorry, couldn't edit product" }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: "Sorry, couldn't edit product" }));
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
			dispatch(onGetProductList({ currentPage: 1 }));
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
