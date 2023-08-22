import { createSlice } from "@reduxjs/toolkit";
import BASEURL from "../../Config/global";

const soundPlayerSlice = createSlice({
  name: "soundPlayer",
  initialState: {
    sounds: [],
    audio: {},
    errorMessage: false,
  },
  reducers: {
    playSound(state, action) {
      // const { source, title, thumbnail, naration } = action.payload;
      // console.log(action.payload);
      const soundExists = state.sounds.some(
        (sound) => sound.audio === action.payload.audio
        );
        if (!soundExists) {
          // console.log(state);
        // if (naration) {
        //   const prevNarationSoundIndex = state.sounds.findIndex(
        //     (sound) => sound.naration
        //   );
        //   if (prevNarationSoundIndex !== -1) {
        //     state.sounds.splice(prevNarationSoundIndex, 1);
        //   }
        // }

        // const newSound = {
        //   audioSource: BASEURL + source,
        //   audioTitle: title,
        //   audioThumbnail: BASEURL + thumbnail,
        //   naration: naration,
        // };
        state.sounds.push(action.payload);
      }
    },
    playAudio(state, action) {
      if (state.audio?.audio == action.payload.audio) {
        return;
      } else {
        state.audio = action.payload;
      }
    },
    // playSound(state, action) {
    //   const soundExists = state.sounds.some((sound) => {
    //     return sound.audio === action.payload.audio;
    //   });
    //   if (!soundExists) {
    //     state.sounds.push(action.payload);
    //   }
    // },
    removeSound(state, action) {
      const index = action.payload;
      state.sounds.splice(index, 1);
    },
    removeAudio(state, action) {
      state.audio = {};
    },
    clearAllSound(state, action) {
      state.sounds = [];
      state.audio = {};
    },
    hideErrorMessage(state) {
      state.errorMessage = false;
    },
  },
});

export const {
  playSound,
  playAudio,
  // setVolume,
  // playAll,
  // pauseAll,
  // setSoundVolume,
  pauseSound,
  // stopSound,
  removeSound,
  removeAudio,
  clearAllSound,
  hideErrorMessage,
} = soundPlayerSlice.actions;

export default soundPlayerSlice.reducer;
