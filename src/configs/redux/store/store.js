import { configureStore } from "@reduxjs/toolkit";
// import  currentUser  from "../reducers/CurrentUser";
import CurrentUser from "../reducers/CurrentUser";
import  currentUserPostBlog  from "../reducers/CurrentPostBlog";

export const store = configureStore({
    reducer:{
        CurrentUser,
        currentUserPostBlog,

    }
})