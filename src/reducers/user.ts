import { createSlice } from '@reduxjs/toolkit';
import { User } from 'types';
// @ts-ignore
import CryptoJS from 'crypto-js';
// @ts-ignore
import { reactLocalStorage } from 'reactjs-localstorage';
import { AppState } from 'store';

const IDENTYFIER = "__user"

const emptyUser = {
    name: '',
    email: '',
    password: null
}
const data = reactLocalStorage.getObject(IDENTYFIER, {
    ...emptyUser
});

const initState: User = {
    ...data
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {

        updateUserData: (state, action) => {
            const { name, email = "", password = "" } = action.payload;
            state.name = name;
            state.email = email;

            const hash = CryptoJS.SHA256(password);

            state.password = password.length > 0 ? hash.toString(CryptoJS.enc.Base64) : "";

            reactLocalStorage.setObject(IDENTYFIER, { name: name, email: email, password: state.password });

        },
    },
});

export const { updateUserData } = userSlice.actions;
export const isLoggedIn = (state: AppState) => state.user.email.length > 0 && !!state.user.password;
export const getUser = (state: AppState) => state.user;
export default userSlice.reducer;