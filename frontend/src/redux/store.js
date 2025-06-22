import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice";
import ProductReducer from "./slices/productsSlice"
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice"
import orderReducer from "./slices/orderSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products:ProductReducer,
        cart:cartReducer,
        checkout:checkoutReducer,
        orders: orderReducer,
    },
});


export default store;

