// filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: [],
    brand: [],
    minPrice: '',
    maxPrice: '',
    rating: [],
    page: 1,
    limit: 10
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setBrand: (state, action) => {
            state.brand = action.payload;
        },
        setRatingFilter: (state, action) => {
            state.rating = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setMinPrice: (state, action) => {
            state.minPrice = action.payload;
        },
        setMaxPrice: (state, action) => {
            state.maxPrice = action.payload;
        },
    },
});

export const { setCategory, setBrand, setPriceRange, setRatingFilter, setPage, setMinPrice, setMaxPrice } = filterSlice.actions;
export default filterSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const filterSlice = createSlice({
//     name: 'filter',
//     initialState: {
//         category: '',
//         brand: '',
//         sortBy: 'price',
//         sortOrder: 'asc',
//         limit: 10,
//         page: 1,
//         name: ''
//     },
//     reducers: {
//         updateFilter: (state, action) => {
//             return { ...state, ...action.payload };
//         },
//     },
// });

// export const { updateFilter } = filterSlice.actions;
// export default filterSlice.reducer;