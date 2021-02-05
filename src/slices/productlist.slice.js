import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../config/constants';
import fetch from '../utils/axios';

// Number of products to be displayed per page
const limit = 16;
const initialState = { productList: [], status: 'idle', totalPages: 1, currentPage: 1, limit };

const productListSlice = createSlice({
	name: 'productList',
	initialState,
	reducers: {
		storeProductList(state, action) {
			state.productList = action.payload.rows;
			state.totalPages = action.payload.totalPages;
			state.currentPage = action.payload.currentPage;
			state.status = 'success';
		},
		updateProductList(state, action) {
			state.currentPage = action.payload.currentPage;
			let j = 0;
			for (let i = (state.currentPage - 1) * limit; i < limit * state.currentPage; i++) {
				if (action.payload.rows[j]) {
					state.productList[i] = action.payload.rows[j++];
				}
			}
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

export const { storeProductList, updateProductList, resetStatus, updateStatus } = productListSlice.actions;
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
			data.update
				? dispatch(updateProductList({ ...response.data.data }))
				: dispatch(storeProductList({ ...response.data.data }));
		} else {
			console.log('Failed to fetch product list');
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		dispatch(updateStatus({ status: 'loading product list failed' }));
	}
	// end loading
	dispatch(updateStatus({ status: 'loading product list over' }));
	// reset
	dispatch(resetStatus());
};

export const onSearchAllProductsList = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'searching all store products' }));
	// try-catch // storeProductListing
	try {
		const response = await fetch.get(
			`${baseURL}/product?search=${data.searchTerm}&page=${data.currentPage}&range=${limit}`
		);
		console.log(response);
		if (response.status === 200) {
			data.update
				? dispatch(updateProductList({ ...response.data.data }))
				: dispatch(storeProductList({ ...response.data.data }));
		} else {
			console.log('Failed to fetch search results');
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
	}
	// end loading
	dispatch(updateStatus({ status: 'searching all store products over' }));
	// reset
	dispatch(resetStatus());
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
			dispatch(onGetProductList({ currentPage: 1 }));
			// notification display
		} else {
			console.log('Something went wrong while deleting product.');
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
