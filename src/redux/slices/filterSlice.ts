import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ISort {
    name: "популярности" | "цене" | "алфавиту";
    sortProperty: "rating" | "price" | "title"
}

interface IFilterSliceState {
    order: boolean;
    categoryId: number;
    sortCategory: ISort;
    searchValue: string;
}

const initialState: IFilterSliceState = {
    order: false,
    categoryId: 0,
    sortCategory: { name: 'популярности', sortProperty: 'rating' },
    searchValue: ''
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setOrder: state => {
            state.order = !state.order
        },
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setSortCategory: (state, action: PayloadAction<ISort>) => {
            state.sortCategory = action.payload
        },
        setFilters: (state, action: PayloadAction<{ order: boolean, categoryId: number, sortCategory: ISort }>) => {
            state.order = action.payload.order
            state.categoryId = action.payload.categoryId
            state.sortCategory = action.payload.sortCategory
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        }
    },
})

export const { setOrder, setCategoryId, setSortCategory, setFilters, setSearchValue } = filterSlice.actions

export const filterReducer = filterSlice.reducer