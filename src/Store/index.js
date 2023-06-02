import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import AudioSlice from "./Slices/AudioSlice";
import SoundPlayerSlice from "./Slices/SoundPlayerSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        audio: AudioSlice,
        soundPlayer: SoundPlayerSlice,
    }
})

export default store