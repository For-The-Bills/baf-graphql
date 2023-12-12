import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API from "../../API/apiService";
import apollo from "../../API/apollo-client";
import { emmitError, emmitSuccess } from "../../utils/ToastEmmiter";
import LatLon from "geodesy/latlon-spherical";
import {
  GQL_GET_COORDINATES_BY_ADDRESS,
  GQL_GET_PARCEL_BY_COORDINATES,
  GQL_GET_PARCEL_SHAPE,
} from "../../queries/cartography.queries";

export const getParcelByCoordinates = createAsyncThunk(
  "calc/getParcelByCoordinates",
  async ({ x, y }, { rejectWithValue }) => {
    return await apollo
      .query({
        query: GQL_GET_PARCEL_BY_COORDINATES,
        variables: {
          getParcelInput: {
            latitude: `${y}`,
            longitude: `${x}`,
          },
        },
      })
      .then((res) => {
        console.log(res);
        return res.data.getParcelByCoordinates;
      })
      .catch((err) => {
        console.log(err);
        throw rejectWithValue(err.response);
      });
  }
);

export const getParcelShape = createAsyncThunk(
  "calc/getParcelShape",
  async ({ x, y }, { rejectWithValue }) => {
    // return await API.get(`/location/shape?lat=${y}&lng=${x}`)
    //   .then((res) => {
    //     console.log(res);
    //     return res.data;
    //   })
    //   .catch((err) => {
    //     throw rejectWithValue(err.response);
    //   });
    return await apollo
      .query({
        query: GQL_GET_PARCEL_SHAPE,
        variables: {
          getParcelShapeInput: {
            latitude: `${y}`,
            longitude: `${x}`,
          },
        },
      })
      .then((res) => {
        console.log(res);
        return res.data.getParcelShape;
      })
      .catch((err) => {
        console.log(err);
        throw rejectWithValue(err.response);
      });
  }
);

export const getParcelShapeByName = createAsyncThunk(
  "calc/getParcelShapeByName",
  async ({ region, number }, { rejectWithValue }) => {
    return await apollo
      .query({
        query: GQL_GET_PARCEL_SHAPE,
        variables: {
          getParcelShapeInput: {
            parcelNumber: `${number}`,
            parcelRegion: `${region}`,
          },
        },
      })
      .then((res) => {
        console.log(res);
        return res.data.getParcelShape;
      })
      .catch((err) => {
        console.log(err);
        throw rejectWithValue(err.response);
      });
  }
);

export const getAddressCoordinates = createAsyncThunk(
  "calc/getAddressCoordinates",
  async ({ address }, { rejectWithValue }) => {
    return await apollo
      .query({
        query: GQL_GET_COORDINATES_BY_ADDRESS,
        variables: {
          getCoordsByAddressInput: {
            address: `${address}`,
          },
        },
      })
      .then((res) => {
        console.log(res);
        return res.data.getCoordinatesByAddress;
      })
      .catch((err) => {
        console.log(err);
        throw rejectWithValue(err.response);
      });
  }
);

function calculateArea(coordinates) {
  const latLons = coordinates.map(([lat, lon]) => new LatLon(lat, lon));

  const areaInSquareMeters = LatLon.areaOf(latLons);

  return areaInSquareMeters;
}

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
    indicators: {
      mieszkaniowa: 0.6,
      "przestrzenie publiczne": 0.6,
      usługowa: 0.3,
      produkcyjna: 0.3,
      "usługowo-produkcyjna": 0.3,
      "usługowo-mieszkaniowa": 0.5,
      "składy i magazyny": 0.3,
    },
    surfaces: {
      "powierzchnie szczelne (nieprzepuszczalne)": {
        name: "powierzchnie szczelne (nieprzepuszczalne)",
        value: 0,
        color: "#6e6e6e",
      },
      "powierzchnie półprzepuszczalne": {
        name: "powierzchnie półprzepuszczalne",
        value: 0.5,
        color: "#6a916f",
      },
      "powierzchnie perforowane": {
        name: "powierzchnie perforowane",
        value: 0.3,
        color: "#8be0d5",
      },
      "powierzchnie przepuszczalne": {
        name: "powierzchnie przepuszczalne",
        value: 1,
        color: "#cd8df7",
      },
      zabudowa: {
        name: "zabudowa",
        value: 0,
        color: "#f59520",
      },
      "drzewo (pow. odkryta pod koroną, m2)": {
        name: "drzewo (pow. odkryta pod koroną, m2)",
        value: 1,
        color: "#20f52e",
      },
      "krzew (pow. odkryta pod krzewem, m2)": {
        name: "krzew (pow. odkryta pod krzewem, m2)",
        value: 0.7,
        color: "#3520f5",
      },
      "łąka kwietna": {
        name: "łąka kwietna",
        value: 0.7,
        color: "#f520aa",
      },
      "trawa (murawa)": {
        name: "trawa (murawa)",
        value: 0.3,
        color: "#b1f520",
      },
      "dachy zielone": {
        name: "dachy zielone",
        value: 0.7,
        color: "#20d5f5",
      },
      "ściany zielone": {
        name: "ściany zielone",
        value: 0.5,
        color: "#f1f520",
      },
      "rośliny pnące (na 1m2 powierzchni)": {
        name: "rośliny pnące (na 1m2 powierzchni)",
        value: 0.3,
        color: "#00ad0c",
      },
      "ogród deszczowy (na 1m2)": {
        name: "ogród deszczowy (na 1m2)",
        value: 0.7,
        color: "#0600ad",
      },
    },
    currentlySelectedLayerIndex: -1,
    zoomToCoords: [0, 0],
  },
  reducers: {
    clearParcelData: (state) => {
      state.parcelData = {};
      state.parcelLoading = false;
      state.infoModal = false;
      state.editorData = {};
      state.additionModal = false;
      state.currentlySelectedLayerIndex = -1;
      state.parcelSelected = false;
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
    },
    addNewMarker: (state, action) => {
      state.editorData.layers[state.currentlySelectedLayerIndex].polygon.push(
        action.payload
      );
    },
    completeLayer: (state) => {
      if (
        state.editorData.layers[state.currentlySelectedLayerIndex].polygon
          .length < 3
      ) {
        emmitError("Za mało punktów na warstwie");
        return;
      }
      const poly = current(
        state.editorData.layers[state.currentlySelectedLayerIndex].polygon
      );
      console.log(poly);
      const a = calculateArea([...poly, poly[0]]);
      console.log(a);
      state.editorData.layers[state.currentlySelectedLayerIndex].area =
        parseFloat(a.toFixed(2));
      state.currentlySelectedLayerIndex = -1;
    },
    removeLayer: (state, action) => {
      console.log(action.payload);
      state.editorData.layers = state.editorData.layers.filter(
        (_, index) => index != action.payload
      );
      state.currentlySelectedLayerIndex = -1;
    },
    redoMarker: (state) => {
      state.editorData.layers[state.currentlySelectedLayerIndex].polygon.pop();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getParcelByCoordinates.pending, (state, action) => {
      state.parcelLoading = true;
    });
    builder.addCase(getParcelByCoordinates.fulfilled, (state, action) => {
      console.log(action.payload);
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
      state.editorData = { ...action.payload, layers: [] };
      state.editorData.area = calculateArea(action.payload.coords);
      state.parcelSelected = true;
      state.infoModal = false;
      state.zoomToCoords = [
        action.payload.polygon_center[1],
        action.payload.polygon_center[0],
      ];
    });

    builder.addCase(getParcelShape.rejected, (state, action) => {
      state.editorLoading = false;
      state.editorData = {};
      state.parcelSelected = false;

      emmitError(action.payload.data.error);
    });

    builder.addCase(getParcelShapeByName.pending, (state, action) => {
      state.parcelLoading = true;
    });

    builder.addCase(getParcelShapeByName.fulfilled, (state, action) => {
      state.parcelLoading = false;
      state.editorData = {
        coords: action.payload.coords,
        polygon_center: action.payload.polygon_center,
        max_bounds: action.payload.max_bounds,
        layers: [],
      };
      state.editorData.area = calculateArea(action.payload.coords);
      state.parcelData = {
        parcelNumber: action.payload.parcelNumber,
        parcelRegion: action.payload.parcelRegion,
      };
      state.parcelSelected = true;
      state.infoModal = false;
      state.zoomToCoords = action.payload.polygon_center.reverse();
    });

    builder.addCase(getParcelShapeByName.rejected, (state, action) => {
      state.parcelLoading = false;
      state.editorData = {};
      state.parcelSelected = false;

      emmitError(action.payload.data.error);
    });

    builder.addCase(getAddressCoordinates.pending, (state, action) => {
      state.parcelLoading = true;
    });

    builder.addCase(getAddressCoordinates.fulfilled, (state, action) => {
      state.parcelLoading = false;
      state.zoomToCoords = [action.payload.x, action.payload.y]
    });

    builder.addCase(getAddressCoordinates.rejected, (state, action) => {
      state.parcelLoading = false;
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
  addNewLayer,
  addNewMarker,
  completeLayer,
  removeLayer,
  redoMarker,
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
export const selectCurrentlySelectedLayerIndex = (state) =>
  state.calc.currentlySelectedLayerIndex;
export const selectIndicators = (state) => state.calc.indicators;
export const selectZoomToCoords = (state) => state.calc.zoomToCoords;

export default reducer;
