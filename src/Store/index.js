import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import AudioSlice from "./Slices/AudioSlice";
import SoundPlayerSlice from "./Slices/SoundPlayerSlice";
import MixerSlice from "./Slices/MixerSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        audio: AudioSlice,
        soundPlayer: SoundPlayerSlice,
        mixer: MixerSlice,
    }
})

export default store