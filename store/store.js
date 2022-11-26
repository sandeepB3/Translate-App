//React Reducer Configuration
import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./historySlice"; //Making a slice
import savedItemsSlice from "./savedItemsSlice";

export default configureStore({
    reducer: {
        //Name of slice: Name of Object
        history: historySlice,
        savedItem: savedItemsSlice,
    }
})