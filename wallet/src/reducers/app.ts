import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { App } from 'types';
// @ts-ignore
import { reactLocalStorage } from 'reactjs-localstorage';

import { AppState } from '../store';
import { client } from '../api'

const IDENTYFIER = "__app"


const data = reactLocalStorage.getObject(IDENTYFIER, {
    loggedIn: false
});


const initState: App = {
    init: false,
    sharingVCP: false,
    ...data
}

export const shareCredentials = createAsyncThunk(
    'users/shareCred',
    async ({ vcs, url, privateKey, publicKey }: { vcs: any, url: string, privateKey: string, publicKey: string }) => {
        const response = await client.post('/api/vcp', { vcs, privateKey, publicKey });

        const vcp = response.vcp;

        const verified = await client.post(url, { vcp });
        return verified;
    }
)


export const sendVCPRequest = createAsyncThunk(
    'users/sendVCPRequest',
    async ({ url }: { url: string }) => {
        console.log(url)
        const response = await client.get(url);
        return response;
    }
)


export const appSlice = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
        changeInit: (state, action) => {
            state.init = action.payload.init;
        },
        changeLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
            reactLocalStorage.setObject(IDENTYFIER, { loggedIn: state.loggedIn });
        },
        setVCPIsSharing: (state, action) => {
            state.sharingVCP = action.payload;
        },
        setVcpRequest: (state, action) => {
            state.vcpRequest = action.payload;
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(shareCredentials.fulfilled, (state, action) => {
                console.log(action.payload)
                state.sharingVCP = 'fulfilled';
            })
            .addCase(shareCredentials.rejected, (state, action) => {
                console.log(action.payload)
                state.sharingVCP = 'rejected';
                state.vcpRequest = null;
            })
            .addCase(sendVCPRequest.fulfilled, (state, action) => {
                console.log(action.payload)
                state.vcpRequest = action.payload;
            })

    },
});

export const { changeInit, changeLoggedIn, setVCPIsSharing, setVcpRequest } = appSlice.actions;
export const isLoggedIn = (state: AppState) => state.app.loggedIn;
export const getSharingVCP = (state: AppState) => state.app.sharingVCP;
export const getVcpRequest = (state: AppState) => state.app.vcpRequest;
export const isInit = (state: AppState) => state.app.init;

export default appSlice.reducer;