
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'types';
// @ts-ignore
import { reactLocalStorage } from 'reactjs-localstorage';
import { AppState } from 'store';

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

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {

        updateUserData: (state, action) => {
            const { name, lastName = "", email = "", password = "", vc, vpc, publicKey, privateKey } = action.payload;
            state.name = name;
            state.lastName = lastName;
            state.email = email;

            state.password = password;
            state.documents = [{ id: '1', title: "New Zealand Passport", subTitle: "Department of Internal Affairs", vc: vc, vpc: vpc }]

            reactLocalStorage.setObject(IDENTIFIER, { name: name, email: email, password: state.password, documents: state.documents, vc, vpc, publicKey, privateKey });

        },
    },
});

export const { updateUserData } = userSlice.actions;
export const isLoggedIn = (state: AppState) => state.user.email.length > 0 && !!state.user.password;
export const getUser = (state: AppState) => state.user;
export const getDocuments = (state: AppState) => state.user.documents;
export const getDocumentbyId = (state: AppState, id: string) => state.user.documents?.find(k => k.id === id);

export default userSlice.reducer;