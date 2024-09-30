import { createSlice } from "@reduxjs/toolkit";

export const currentUserPostBlog = createSlice({
    name:'currentUserPostBlog',
    initialState:{
        currentUserPostBlogDt:null
    },
    reducers:{
        setCurrentUserPostBlogDt: (state, action) => {
            state.currentUserPostBlogDt = action.payload
        },
    }
})
export const { setCurrentUserPostBlogDt } = currentUserPostBlog.actions
export default currentUserPostBlog.reducer