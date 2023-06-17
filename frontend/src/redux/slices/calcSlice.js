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
  async ({ x, y }, { rejectWithValue }) => {
    return await API.get(`/location/shape?lat=${y}&lng=${x}`)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        throw rejectWithValue(err.response);
      });
  }
);

export const calcSlice = createSlice({
  name: "logs",
  initialState: {
    parcelData: {},
    parcelSelected: false,
    parcelLoading: false,
    editorLoading: false,
    editorData: {},
    additionModal: false,
    infoModal: false,
    mapPositionCenter: [50.321484, 19.194942],
    surfaces: {
      "powierzchnie szczelne (nieprzepuszczalne)": {
        name: "powierzchnie szczelne (nieprzepuszczalne)",
        value: 0,
        color: "#6e6e6e"
      },
      "powierzchnie półprzepuszczalne": {
        name: "powierzchnie półprzepuszczalne",
        value: 0.5,
        color: "#6a916f"
      },
      "powierzchnie perforowane": {
        name: "powierzchnie perforowane",
        value: 0.3,
        color: "#8be0d5"
      },
      "powierzchnie przepuszczalne": {
        name: "powierzchnie przepuszczalne",
        value: 1,
        color: "#cd8df7"
      },
      zabudowa: {
        name: "zabudowa",
        value: 0,
        color: "#f59520"
      },
      "drzewo (pow. odkryta pod koroną, m2)": {
        name: "drzewo (pow. odkryta pod koroną, m2)",
        value: 1,
        color: "#20f52e"
      },
      "krzew (pow. odkryta pod krzewem, m2)": {
        name: "krzew (pow. odkryta pod krzewem, m2)",
        value: 0.7,
        color: "#3520f5"
      },
      "łąka kwietna": {
        name: "łąka kwietna",
        value: 0.7,
        color: "#f520aa"
      },
      "trawa (murawa)": {
        name: "trawa (murawa)",
        value: 0.3,
        color: "#b1f520"
      },
      "dachy zielone": {
        name: "dachy zielone",
        value: 0.7,
        color: "#20d5f5"
      },
      "ściany zielone": {
        name: "ściany zielone",
        value: 0.5,
        color: "#f1f520"
      },
      "rośliny pnące (na 1m2 powierzchni)": {
        name: "rośliny pnące (na 1m2 powierzchni)",
        value: 0.3,
        color: "#00ad0c"
      },
      "ogród deszczowy (na 1m2)": {
        name: "ogród deszczowy (na 1m2)",
        value: 0.7,
        color: "#0600ad"
      }
    },
    currentlySelectedLayerIndex: -1
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
    closeAdditionModal: (state) => {
      state.additionModal = false;
    },
    openAdditionModal: (state) => {
      state.additionModal = true;
    },
    addNewLayer: (state, action) => {
      state.currentlySelectedLayerIndex = state.editorData.layers.length;
      state.editorData.layers.push(action.payload);
      state.additionModal = false;
    }
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
    });

    builder.addCase(getParcelShape.fulfilled, (state, action) => {
      state.editorLoading = false;
      state.editorData = {...action.payload, layers:[]};
      state.parcelSelected = true;
      state.infoModal = false;
      state.mapPositionCenter = action.payload.polygon_center.reverse();
    });

    builder.addCase(getParcelShape.rejected, (state, action) => {
      state.editorLoading = false;
      state.editorData = {};
      state.parcelSelected = false;

      emmitError(action.payload.data.error);
    });
  },
});

const { actions, reducer } = calcSlice;

export const {
  clearParcelData,
  closeInfoModal,
  closeAdditionModal,
  openAdditionModal,
  addNewLayer
} = actions;

export const selectParcelData = (state) => state.calc.parcelData;
export const selectParcelLoading = (state) => state.calc.parcelLoading;
export const selectInfoModal = (state) => state.calc.infoModal;
export const selectEditorLoading = (state) => state.calc.editorLoading;
export const selectEditorData = (state) => state.calc.editorData;
export const selectParcelSelected = (state) => state.calc.parcelSelected;
export const selectMapPositionCenter = (state) => state.calc.mapPositionCenter;
export const selectAdditionModalState = (state) => state.calc.additionModal;
export const selectSurfaces = (state) => state.calc.surfaces;
export const selectCurrentlySelectedLayerIndex = (state) => state.calc.currentlySelectedLayerIndex;

export default reducer;
