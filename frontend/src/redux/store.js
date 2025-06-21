import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice";
import ProductReducer from "./slices/productsSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        products:ProductReducer,
    },
});


export default store;

