import { createSlice } from "@reduxjs/toolkit";

export const currentUser = createSlice({
    name: 'currentUser',
    initialState: {
        currentUserdta: null
    },
    reducers: {
        setCurrentUserData: (state, action) => {
            state.currentUserdta = action.payload
        },
        UpateCurrentUserData: (state, action) => {
            if (state.currentUserdta) {
                Object.assign(state.currentUserdta, action.payload);
            }
        },
    }
})

export const { setCurrentUserData, UpateCurrentUserData } = currentUser.actions
export default currentUser.reducer