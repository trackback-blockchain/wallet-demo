
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

const bloodTypes = ["A", "B", "AB", "O"];
const rh = ["+", "-"]

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function randomBloodType() {
    return `${bloodTypes[getRandomInt(bloodTypes.length)]}${rh[getRandomInt(rh.length)]}`
}

export const register = createAsyncThunk(
    'users/register',
    async ({ name, lastName }: { [key: string]: string }) => {
        const response = await client.post(`/api/register`, { name, lastName, bloodType: randomBloodType() });
        return response;
    }
)


export const loadVCFromIssuer = createAsyncThunk(
    'users/loadVC',
    async (url: string) => {
        const response = await client.post(url, {});
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

        addVC: (state, action) => {
            const vc = action.payload.vc;

            const documents = (state.documents || []).filter((doc) => {
                return doc.type !== vc.type;
            });
            
            state.documents = [...documents, { id: documents.length + 1, ...vc }]
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(register.fulfilled, (state, action) => {
                console.log(action.payload)
                state.documents = [...action.payload.vcs]
                state.publicKey = action.payload.publicKey;
                state.privateKey = action.payload.privateKey;

                reactLocalStorage.setObject(IDENTIFIER, { ...state });
            }).addCase(loadVCFromIssuer.fulfilled, (state, action) => {

                if (!action.payload.vc || Object.keys(action.payload.vc).length === 0) {
                    return
                }
                const vc = action.payload.vc;
                
                const documents = (state.documents || []).filter((doc) => {
                    return doc.type !== vc.type;
                });
                
                state.documents = [...documents, { id: documents.length + 1, ...vc }]

                reactLocalStorage.setObject(IDENTIFIER, { ...state });

            })
    },
});

export const { updateUserData, addVC } = userSlice.actions;
export const isLoggedIn = (state: AppState) => state.user.email.length > 0 && !!state.user.password;
export const getUser = (state: AppState) => state.user;
export const getDocuments = (state: AppState) => state.user.documents;
export const getDocumentbyId = (state: AppState, id: string) => state.user.documents?.find(k => `${k.id}` === id);
export const getDocumentbyType = (state: AppState, id: string) => state.user.documents?.find(k => `${k.type}` === id);
export const getKeys = (state: AppState) => { const { publicKey, privateKey } = state.user; return { publicKey, privateKey } };

export default userSlice.reducer;