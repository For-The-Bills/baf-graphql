import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../API/apiService";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { history } from "../../index.jsx";
import { emmitError, emmitSuccess } from "../../utils/ToastEmmiter";


export const calcSlice = createSlice({
  name: "logs",
  initialState: {
    
  },
  reducers: {},
  extraReducers: (builder) => {
   
  },
});

const { actions, reducer } = calcSlice;

export const {} = actions;


export default reducer;
