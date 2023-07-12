import { createSlice } from "@reduxjs/toolkit";
import BASEURL from "../../Config/global";

const soundPlayerSlice2 = createSlice({
  name: "soundPlayer2",
  initialState: {
    sounds: [],
  },
  reducers: {
    playSound2(state, action) {
      const { audio, title, thumbnail, naration } = action.payload;
      console.log("action.payload => ", action.payload.audio);
    },
  },
});

export const { playSound2 } = soundPlayerSlice2.actions;

export default soundPlayerSlice2.reducer;
