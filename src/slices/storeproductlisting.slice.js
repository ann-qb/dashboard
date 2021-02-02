import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../config/constants';
import fetch from '../utils/axios';

// Number of products to be displayed per page
const limit = 4;
const initialState = { productListing: [], status: 'idle', currentPage: 1, totalPages: 1, productCount: 0 };

const storeProductListingSlice = createSlice({
    name: 'storeProductListing',
    initialState,
    reducers: {
        storeProductListing(state, action) {
            state.productListing = action.payload.rows;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.productCount = action.payload.count;
            state.status = 'success';
        },
        updateProductListing(state, action) {
            state.currentPage = action.payload.currentPage;
            let j = 0;
            for (let i = (state.currentPage - 1) * limit; i < limit * state.currentPage; i++) {
                if (action.payload.rows[j]) {
                    state.productListing[i] = action.payload.rows[j++];
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

export const {
    storeProductListing,
    updateProductListing,
    resetStatus,
    updateStatus,
} = storeProductListingSlice.actions;
export default storeProductListingSlice.reducer;

export const onGetStoreProductListing = (data) => async(dispatch) => {
    // reset
    dispatch(resetStatus());
    // loading
    dispatch(updateStatus({ status: 'loading product listing' }));
    // try-catch // storeProductListing
    try {
        const response =
            data.subCategory === undefined ?
            await fetch.get(`${baseURL}/product?category=${data.category}&page=${data.currentPage}&range=${limit}`) :
            await fetch.get(`${baseURL}/product?subcategory=${data.subCategory}&page=${data.currentPage}&range=${limit}`);
        console.log(response);
        if (response.status === 200) {
            data.update ?
                dispatch(updateProductListing({...response.data.data })) :
                dispatch(storeProductListing({...response.data.data }));
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

export const onSearchStore = (data) => async(dispatch) => {
    // reset
    dispatch(resetStatus());
    // loading
    dispatch(updateStatus({ status: 'searching store' }));
    // try-catch // storeProductListing
    try {
        const response = await fetch.get(
            `${baseURL}/product?search=${data.searchTerm}&page=${data.currentPage}&range=${limit}`
        );
        console.log(response);
        if (response.status === 200) {
            data.update ?
                dispatch(updateProductListing({...response.data.data })) :
                dispatch(storeProductListing({...response.data.data }));
        } else {
            console.log('Failed to fetch search results');
        }
    } catch (error) {
        console.log(error);
        console.log(error.response);
    }
    // end loading
    dispatch(updateStatus({ status: 'searching store over' }));
    // reset
    dispatch(resetStatus());
};