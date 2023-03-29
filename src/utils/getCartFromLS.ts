import { ICartItem } from "../redux/slices/cartSlice"

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) as ICartItem[] : [] as ICartItem[]
}