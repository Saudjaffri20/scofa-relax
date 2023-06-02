import { createSlice } from "@reduxjs/toolkit";
import BASEURL from "../../Config/global";

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audioId: null,
    audioSource: null,
    audioTitle: null,
    audioThumbnail: null,
  },
  reducers: {
    playAudio(state, action) {
      const { id, source, title, thumbnail } = action.payload;
      return {
        audioId: id,
        audioSource: BASEURL + source,
        audioTitle: title,
        audioThumbnail: BASEURL + thumbnail,
      };
    },
  },
});

export default audioSlice.reducer;
export const { playAudio } = audioSlice.actions;
