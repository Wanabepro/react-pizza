import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IPizza {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
    category: number
}

interface IPizzasSliceState {
    items: IPizza[];
    status: Status
}

interface IParams {
    categoryId: number;
    sortProperty: string;
    sortOrder: string
}

enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

const initialState: IPizzasSliceState = {
    items: [],
    status: Status.LOADING
}

export const fetchItems = createAsyncThunk<IPizza[], IParams>(
    'pizzas/fetchItems',
    async (params) => {
        const response = await axios.get(params.categoryId === 0
            ? `https://6419881ac152063412c4b11e.mockapi.io/items?&sortBy=${params.sortProperty}&order=${params.sortOrder}`
            : `https://6419881ac152063412c4b11e.mockapi.io/items?&category=${params.categoryId}&sortBy=${params.sortProperty}&order=${params.sortOrder}`
        )
        return response.data
    }
)

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state, action) => {
            state.status = Status.LOADING
        })

        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.items = action.payload
        })

        builder.addCase(fetchItems.rejected, (state, action) => {
            state.status = Status.ERROR
            state.items = []
        })
    }
})

export const pizzasReducer = pizzasSlice.reducer