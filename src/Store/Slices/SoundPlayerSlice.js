import { createSlice } from "@reduxjs/toolkit";
import BASEURL from "../../Config/global";

const soundPlayerSlice = createSlice({
  name: "soundPlayer",
  initialState: {
    sounds: [],
    errorMessage: false,
  },
  reducers: {
    playSound(state, action) {
      const soundExists = state.sounds.some((sound) => {
        return sound.audio === action.payload.audio;
      });
      if (!soundExists) {
        state.sounds.push(action.payload);
      }
    },
    removeSound(state, action) {
      const index = action.payload;
      state.sounds.splice(index, 1);
    },
  },
});

export const {
  playSound,
  removeSound,
} = soundPlayerSlice.actions;

export default soundPlayerSlice.reducer;
