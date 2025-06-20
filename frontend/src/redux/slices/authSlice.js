import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';


//retrive user data from localStorage
const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;

//check for an existing guest id in the localstoarge or generate a new one
const initialGuestId = localStorage.getItem('guestId') || `guest_${new Date().getTime()}`;
localStorage.setItem('guestId', initialGuestId);

// Initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, userData);
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        localStorage.setItem('userToken', response.data.token);
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});