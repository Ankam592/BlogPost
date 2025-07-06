import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authSlice";

const store = configureStore({
    reducer: {
        auth: reducer, // You can add more reducers here
      },
})

export default store;