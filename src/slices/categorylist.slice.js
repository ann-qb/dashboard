import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../config/constants';
import fetch from './../utils/axios';

const initialState = { categoryList: [], status: 'idle' };

const categoryListSlice = createSlice({
	name: 'categorylist',
	initialState,
	reducers: {
		storeCategoryList(state, action) {
			const categoryListArray = action.payload.categoryList.reverse();
			categoryListArray.map((each) => each.Subcategories.reverse());
			state.categoryList = categoryListArray;
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

export const { storeCategoryList, resetStatus, updateStatus } = categoryListSlice.actions;
export default categoryListSlice.reducer;

export const onGetCategoryList = () => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading category list' }));
	// try-catch // storeCategoryList
	try {
		const response = await fetch.get(`${baseURL}/subcategory`);
		console.log(response);
		if (response.status === 200) {
			dispatch(storeCategoryList({ categoryList: response.data.data }));
		} else {
			console.log('Failed to fetch category list');
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
	}
	// end loading
	dispatch(updateStatus({ status: 'loading category list over' }));
	// reset
	dispatch(resetStatus());
};

export const onAddCategory = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetCategoryList
	try {
		const response = await fetch.post(`${baseURL}/category/create`, {
			name: data.category,
		});
		console.log(response);
		if (response.status === 201) {
			dispatch(updateStatus({ status: 'add category success' }));
			dispatch(onGetCategoryList());
			// notification display
		} else {
			console.log('Something went wrong while adding new category.');
			dispatch(updateStatus({ status: 'add category failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		console.log(error.response.data.message);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'add category failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onEditCategory = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetCategoryList
	try {
		const response = await fetch.put(`${baseURL}/category/${data.categoryId}`, {
			name: data.category,
		});
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'edit category success' }));
			console.log(data.id);
			dispatch(onGetCategoryList());
			// notification display
		} else {
			console.log('Something went wrong while editing category details.');
			dispatch(updateStatus({ status: 'edit category failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'edit category failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onDeleteCategory = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetCategoryList
	try {
		const response = await fetch.delete(`${baseURL}/category/${data.categoryId}`);
		console.log(response);
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'delete category success' }));
			dispatch(onGetCategoryList());
			// notification display
		} else {
			console.log('Something went wrong while deleting category.');
			dispatch(updateStatus({ status: 'delete category failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'delete category failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onAddSubCategory = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetCategoryList
	try {
		const response = await fetch.post(`${baseURL}/subCategory/create`, {
			name: data.subcategory,
			category: data.parentCategory,
		});
		console.log(response);
		if (response.status === 201) {
			dispatch(updateStatus({ status: 'add subcategory success' }));
			dispatch(onGetCategoryList());
			// notification display
		} else {
			console.log('Something went wrong while adding new subcategory.');
			dispatch(updateStatus({ status: 'add subcategory failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		console.log(error.response.data.message);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'add subcategory failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onEditSubCategory = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetCategoryList
	try {
		const response = await fetch.put(`${baseURL}/subCategory/${data.subcategoryId}`, {
			name: data.subcategory,
		});
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'edit subcategory success' }));
			console.log(data.id);
			dispatch(onGetCategoryList());
			// notification display
		} else {
			console.log('Something went wrong while editing subcategory details.');
			dispatch(updateStatus({ status: 'edit subcategory failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'edit subcategory failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onDeleteSubCategory = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetCategoryList
	try {
		const response = await fetch.delete(`${baseURL}/subCategory/${data.subcategoryId}`);
		console.log(response);
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'delete subcategory success' }));
			dispatch(onGetCategoryList());
			// notification display
		} else {
			console.log('Something went wrong while deleting subcategory.');
			dispatch(updateStatus({ status: 'delete subcategory failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'delete subcategory failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};
