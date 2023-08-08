import { createSlice } from "@reduxjs/toolkit";
import BASEURL from "../../Config/global";

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audio: null,
  },
  reducers: {
    playAudio(state, action) {
      if (state.audio?.audio == action.payload.audio) {
        return;
      } else {
        state.audio = action.payload;
      }
    },
    removeAudio(state, action) {
      state.audio = null;
    },
  },
});

export default audioSlice.reducer;
export const { playAudio, removeAudio } = audioSlice.actions;
