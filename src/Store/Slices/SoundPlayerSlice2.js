import { createSlice } from "@reduxjs/toolkit";
import BASEURL from "../../Config/global";

const soundPlayerSlice2 = createSlice({
  name: "soundPlayer2",
  initialState: {
    sounds: [],
  },
  reducers: {
    playSound2(state, action) {
      const firstAudio = action.payload.audio_list[0];
      const soundExists = state.sounds.some((sound) => {
        return sound.audio_list[0] === firstAudio; // Check if audio_list already exists in sounds array
      });
      if (!soundExists) {
        state.sounds.push(action.payload);
      }
    },
  },
});

export const { playSound2 } = soundPlayerSlice2.actions;

export default soundPlayerSlice2.reducer;
