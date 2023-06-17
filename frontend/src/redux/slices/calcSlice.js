import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../API/apiService";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { history } from "../../index.jsx";
import { emmitError, emmitSuccess } from "../../utils/ToastEmmiter";

export const getParcelByCoordinates = createAsyncThunk(
  "calc/getParcelByCoordinates",
  async ({ x, y }, { rejectWithValue }) => {
    return await API.get(
      `/location/by_coordinates?lat=${y}&lng=${x}&sourceCRS=EPSG4326&targetCRS=EPSG2180`
    )
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        throw rejectWithValue(err.response);
      });
  }
);

export const getParcelShape = createAsyncThunk(
    "calc/getParcelShape",
    async ({ x,y }, { rejectWithValue }) => {
            return await API.get(`/location/shape?lat=${y}&lng=${x}`)
            .then((res) => {
                console.log(res)
                return res.data
            })
            .catch((err) => {
                throw rejectWithValue(err.response);
            })
    }
)

export const calcSlice = createSlice({
  name: "logs",
  initialState: {
    parcelData: {},
    parcelSelected: false,
    parcelLoading: false,
    editorLoading: false,
    editorData: {},
    infoModal: false,
    mapPositionCenter: [50.321484, 19.194942],
  },
  reducers: {
    clearParcelData: (state) => {
      state.parcelData = {};
      state.parcelLoading = false;
      state.infoModal = false;
    },
    closeInfoModal: (state) => {
        state.infoModal = false;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(getParcelByCoordinates.pending, (state, action) => {
      state.parcelLoading = true;
    });
    builder.addCase(getParcelByCoordinates.fulfilled, (state, action) => {
      state.parcelLoading = false;
      state.parcelData = action.payload;
      state.infoModal = true;
    });
    builder.addCase(getParcelByCoordinates.rejected, (state, action) => {
      state.parcelLoading = false;
      state.parcelData = {};

      emmitError(action.payload.data.error);
    });

    builder.addCase(getParcelShape.pending, (state, action) => {
        state.editorLoading = true;
    })

    builder.addCase(getParcelShape.fulfilled, (state, action) => {
        state.editorLoading = false;
        state.editorData = action.payload;
        state.parcelSelected = true;
        state.infoModal = false;
        state.mapPositionCenter = action.payload.polygon_center.reverse();
    })

    builder.addCase(getParcelShape.rejected, (state, action) => {
        state.editorLoading = false;
        state.editorData = {};
        state.parcelSelected = false;

        emmitError(action.payload.data.error);
    })


  },
});

const { actions, reducer } = calcSlice;

export const {clearParcelData, closeInfoModal} = actions;

export const selectParcelData = (state) => state.calc.parcelData;
export const selectParcelLoading = (state) => state.calc.parcelLoading;
export const selectInfoModal = (state) => state.calc.infoModal;
export const selectEditorLoading = (state) => state.calc.editorLoading;
export const selectEditorData = (state) => state.calc.editorData;
export const selectParcelSelected = (state) => state.calc.parcelSelected;
export const selectMapPositionCenter = (state) => state.calc.mapPositionCenter;

export default reducer;
