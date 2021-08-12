import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { App, VerifiableCredentialPresentation } from 'types';
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
    async ({ vcp, url }: { vcp: VerifiableCredentialPresentation, url: string }) => {
        const response = await client.post(url, { vcp });
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
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(shareCredentials.fulfilled, (state, action) => {
                console.log(action.payload)
                state.sharingVCP = false;
            })
            .addCase(shareCredentials.rejected, (state, action) => {
                console.log(action.payload)
                state.sharingVCP = false;
            })
    },
});

export const { changeInit, changeLoggedIn, setVCPIsSharing } = appSlice.actions;
export const isLoggedIn = (state: AppState) => state.app.loggedIn;
export const isSharingVCP = (state: AppState) => state.app.sharingVCP;
export const isInit = (state: AppState) => state.app.init;

export default appSlice.reducer;