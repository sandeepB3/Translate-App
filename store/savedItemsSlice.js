import { createSlice } from "@reduxjs/toolkit";

const savedItemsSlice = createSlice({
    name: 'savedItem',
    initialState: {
        items: []
    },
    reducers: {
        //state updates the items: [] in initialState
        setSavedItems: (state, action) => {
            // console.log('Starred');
            //Changing old array of items with new array of items, while in history old array remained same
            //we only appended to it
            state.items = action.payload.items
        },
        clearSavedItems: (state) => {
            state.items = [];
        }
    }
})

//Reducer function action imported
export const { setSavedItems, clearSavedItems } = savedItemsSlice.actions;
export default savedItemsSlice.reducer;