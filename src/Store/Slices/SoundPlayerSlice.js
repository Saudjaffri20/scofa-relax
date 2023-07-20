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
      const { source, title, thumbnail, naration } = action.payload;

      const soundExists = state.sounds.some(
        (sound) => sound.audioSource === BASEURL + source
      );
      if (!soundExists) {
        const newSound = {
          audioSource: BASEURL + source,
          audioTitle: title,
          audioThumbnail: BASEURL + thumbnail,
          naration: naration,
        };
        state.sounds.push(newSound);
      }
    },
    removeSound(state, action) {
      const index = action.payload;
      state.sounds.splice(index, 1);
    },
    clearAllSound(state, action) {
      state.sounds = [];
    },
    hideErrorMessage(state) {
      state.errorMessage = false;
    },
  },
});

export const {
  playSound,
  // setVolume,
  // playAll,
  // pauseAll,
  // setSoundVolume,
  pauseSound,
  stopSound,
  removeSound,
  clearAllSound,
  hideErrorMessage,
} = soundPlayerSlice.actions;

export default soundPlayerSlice.reducer;
