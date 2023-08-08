import { createSlice } from "@reduxjs/toolkit";
import BASEURL from "../../Config/global";

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audio: null,
  },
  reducers: {
    playAudio(state, action) {
      if (state.audio && state.audio.src === action.payload.src) {
        return;
      } else {
        state.audio = action.payload;
        console.log(action.payload);
      }
    },
  },
});

export default audioSlice.reducer;
export const { playAudio } = audioSlice.actions;
