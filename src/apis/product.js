import { store } from "../redux/store";
import api from "./axios";
import { axiosPrivate } from "./axios";


//Product
export const getProducts = async () => {
    const formatFiltersForURL = (filter) => {
        const filters = [];
        filters.push(`page=${filter.page}`)
        filters.push(`litmit=${filter.limit}`)
        if (filter.minPrice) filters.push(`minPrice=${filter.minPrice}`)
        if (filter.maxPrice) filters.push(`maxPrice=${filter.maxPrice}`)

        if (filter.category.length > 0) {
            filters.push(`category=${filter.category.join(',')}`);
        }
        // if (filter.rating.length > 0) {
        //     filters.push(`rating=${filter.rating.join(',')}`);
        // }

        if (filter.brand.length > 0) {
            filters.push(`brand=${filter.brand.join(',')}`);
        }
        if (filter.rating.length > 0) {
            filters.push(`rating=${filter.rating.join(',')}`);
        }

        // if (filter.priceRange.min !== 0 || filter.priceRange.max !== 1000) {
        //     filters.push(`price=${filter.priceRange.min}-${filter.priceRange.max}`);
        // }

        return filters.length > 0 ? `?${filters.join('&')}` : '';
    };
    try {
        const filter = store.getState().filter

        const response = await api.get(`/products${formatFiltersForURL(filter)}`)
        return response.data.data
    } catch (error) {
        throw error
    }
}

export const getAllCategories = async () => await api.get('/categories')
export const updateCategoryById = async (id) => await axiosPrivate.put(`/category/${id}`)