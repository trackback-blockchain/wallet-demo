
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from 'types';
// @ts-ignore
import { reactLocalStorage } from 'reactjs-localstorage';
import { AppState } from 'store';

import { client } from '../api'

const IDENTIFIER = "__user"

const emptyUser = {
    name: '',
    email: '',
    password: null
}
const data = reactLocalStorage.getObject(IDENTIFIER, {
    ...emptyUser
});

const initState: User = {
    ...data
}


export const register = createAsyncThunk(
    'users/register',
    async ({ name, lastName }: { [key: string]: string }) => {
        const API_HOST = process.env.API_HOST || 'https://wallet.trackback.dev'
        const response = await client.post(`${API_HOST}/api/register`, { name, lastName });
        return response;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {

        updateUserData: (state, action) => {
            const { name, lastName = "", email = "", password = "" } = action.payload;
            state.name = name;
            state.lastName = lastName;
            state.email = email;

            state.password = password;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(register.fulfilled, (state, action) => {
            console.log(action.payload)
            state.documents = [{ id: '1', title: "New Zealand Passport", subTitle: "Department of Internal Affairs", vc: action.payload.vc, vpc: action.payload.vpc }]
            reactLocalStorage.setObject(IDENTIFIER, { ...state, ...action.payload });
        })
    },
});

export const { updateUserData } = userSlice.actions;
export const isLoggedIn = (state: AppState) => state.user.email.length > 0 && !!state.user.password;
export const getUser = (state: AppState) => state.user;
export const getDocuments = (state: AppState) => state.user.documents;
export const getDocumentbyId = (state: AppState, id: string) => state.user.documents?.find(k => k.id === id);

export default userSlice.reducer;