import { createSlice } from '@reduxjs/toolkit';
import { App } from 'types';
// @ts-ignore
import { reactLocalStorage } from 'reactjs-localstorage';

import { AppState } from '../store';

const IDENTYFIER = "__app"


const data = reactLocalStorage.getObject(IDENTYFIER, {
    loggedIn: false
});


const initState: App = {
    init: false,
    ...data
}

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
        }
    },
});

export const { changeInit, changeLoggedIn } = appSlice.actions;
export const isLoggedIn = (state: AppState) => state.app.loggedIn;
export const isInit = (state: AppState) => state.app.init;



export default appSlice.reducer;