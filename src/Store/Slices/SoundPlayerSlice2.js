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
    removeSoundAction(state, action) {
      const index = action.payload;
      // state.sounds = state.sounds.filter(
      //   (sound) => sound.audio_list !== action.payload.audio_list
      // );
      state.sounds.splice(index, 1);
    },
  },
});

export const { playSound2, removeSoundAction } = soundPlayerSlice2.actions;

export default soundPlayerSlice2.reducer;
