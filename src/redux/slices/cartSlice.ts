import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";

export interface ICartItem {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}

interface ICartSliceState {
    totalPrice: number;
    totalCount: number;
    items: ICartItem[]
}

const initialState: ICartSliceState = {
    items: getCartFromLS(),
    totalPrice: Number(localStorage.getItem('totalPrice')),
    totalCount: Number(localStorage.getItem('totalCount'))
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartItem>) => {
            state.totalCount++
            state.totalPrice += action.payload.price

            const item = state.items.find(el => el.id === action.payload.id)

            if (item) {
                item.count++
            } else {
                state.items.push({ ...action.payload, count: 1 })
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const item = state.items.find(el => el.id === action.payload)
            if (item) {
                state.totalPrice -= item.price * item.count
                state.totalCount -= item.count
                state.items = state.items.filter(item => item.id !== action.payload)
            }
        },
        plusItem: (state, action: PayloadAction<number>) => {
            const item = state.items.find(el => el.id === action.payload)
            if (item) {
                item.count++
                state.totalCount++
                state.totalPrice += item.price
            }
        },
        minusItem: (state, action: PayloadAction<number>) => {
            const item = state.items.find(el => el.id === action.payload)
            if (item) {
                item.count--
                if (item.count === 0) {
                    state.items = state.items.filter(item => item.id !== action.payload)
                }
                state.totalCount--
                state.totalPrice -= item.price
            }
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        }
    },
})

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions

export const cartReducer = cartSlice.reducer