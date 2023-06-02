import { createSlice } from "@reduxjs/toolkit";
import BASEURL from "../../Config/global";

const soundPlayerSlice = createSlice({
  name: "soundPlayer",
  initialState: {
    sounds: [],
  },
  reducers: {
    playSound(state, action) {
      const { source, title, thumbnail } = action.payload;
      const soundExists = state.sounds.some(
        (sound) => sound.audioSource === BASEURL + source
      );
      if (!soundExists) {
        const newSound = {
          audioSource: BASEURL + source,
          audioTitle: title,
          audioThumbnail: BASEURL + thumbnail,
        };
        state.sounds.push(newSound);
      }
    },
    // setVolume(state, action) {
    //   state.overallVolume = action.payload;
    //   state.sounds.forEach((sound) => {
    //     if (sound.howl) {
    //       sound.howl.volume(action.payload);
    //     }
    //   });
    // },
    // playAll(state) {
    //   state.sounds.forEach((sound) => {
    //     if (sound.howl && !sound.howl.playing()) {
    //       sound.howl.play();
    //     }
    //   });
    // },
    // pauseAll(state) {
    //   state.sounds.forEach((sound) => {
    //     if (sound.howl && sound.howl.playing()) {
    //       sound.howl.pause();
    //     }
    //   });
    // },
    // setSoundVolume(state, action) {
    //   const { index, volume } = action.payload;
    //   if (state.sounds[index].howl) {
    //     state.sounds[index].volume = volume;
    //     state.sounds[index].howl.volume(volume * state.overallVolume);
    //   }
    // },
    // pauseSound(state, action) {
    //   const index = action.payload;
    //   if (state.sounds[index].howl && state.sounds[index].howl.playing()) {
    //     state.sounds[index].howl.pause();
    //   }
    // }, 
    // stopSound(state, action) {
    //   const index = action.payload;
    //   if (state.sounds[index].howl && state.sounds[index].howl.playing()) {
    //     state.sounds[index].howl.stop();
    //   }
    // },
    removeSound(state, action) {
      const index = action.payload;
      state.sounds.splice(index, 1);
    },
    
    clearAllSound(state, action) {
      state.sounds = [];
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
} = soundPlayerSlice.actions;

export default soundPlayerSlice.reducer;
