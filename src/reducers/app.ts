import { createSlice } from '@reduxjs/toolkit';
import { App } from 'types';

const initState: App = {
    init: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
        changeInit: (state, action) => {
            state.init = action.payload;
        },
    },
});

export const { changeInit } = appSlice.actions;

export default appSlice.reducer;