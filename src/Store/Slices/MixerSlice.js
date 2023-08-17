import { createSlice } from "@reduxjs/toolkit";
import BASEURL from "../../Config/global";
import { Howler } from "howler";

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
    increaseMixerVolume(state, action) {
      const newVolume = Math.min(
        Math.round((state.volume + 0.2) * 100) / 100,
        1
      );
      state.volume = newVolume;
      Howler.volume(newVolume);
    },

    decreaseMixerVolume(state, action) {
      const newVolume = Math.max(
        Math.round((state.volume - 0.2) * 100) / 100,
        0
      );
      state.volume = newVolume;
      Howler.volume(newVolume);
    },
    resetMixerVolume(state, action) {
      const newVolume = 0.6;
      state.volume = newVolume;
      Howler.volume(newVolume);
    },
  },
});

export const {
  playMixer,
  pauseMixer,
  increaseMixerVolume,
  decreaseMixerVolume,
  resetMixerVolume,
} = mixerSlice.actions;

export default mixerSlice.reducer;
