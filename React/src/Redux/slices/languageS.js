import { createSlice } from "@reduxjs/toolkit";

let languageSlice = createSlice({
    name: 'language',
    initialState: { value: 'en' },
    reducers: {
        changeLanguageFun: function (state, action) {
            state.value = action.payload;
            console.log("language state : ", state.value);
            console.log("action", action);
        }
    }
})

export const { changeLanguageFun } = languageSlice.actions; //for useDispatch and dispatch()

export default languageSlice.reducer;
