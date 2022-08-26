import { configureStore } from '@reduxjs/toolkit'
import productsReducer from "../feature/product-slice";
import cartReducer from "../feature/cart-slice";
export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    },
})