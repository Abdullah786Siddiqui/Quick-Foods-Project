import { createSlice } from "@reduxjs/toolkit";

const savedLocation = localStorage.getItem("userLocation");

const initialState = savedLocation
  ? JSON.parse(savedLocation)
  : {
      short: "",
      full: null,
    };

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.short = action.payload.short;
      state.full = action.payload.full;

      localStorage.setItem(
        "userLocation",
        JSON.stringify(action.payload)
      );
    },
  },
});


export const {setUserLocation } = locationSlice.actions;
export default locationSlice.reducer;
