import { createSlice } from "@reduxjs/toolkit";
import BASEURL from "../../Config/global";

const mixerSlice = createSlice({
  name: "mixer",
  initialState: {
    play: true,
    volume: 0.6,
  },
  reducers: {
    playMixer(state, action) {
      if (!state.play) {
        state.play = true;
      }
    },
    pauseMixer(state, action) {
      if (state.play) {
        state.play = false;
      }
    },
  },
});

export const { playMixer, pauseMixer } = mixerSlice.actions;

export default mixerSlice.reducer;
