import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import AudioSlice from "./Slices/AudioSlice";
import SoundPlayerSlice from "./Slices/SoundPlayerSlice";
import SoundPlayerSlice2 from "./Slices/SoundPlayerSlice2";

const store = configureStore({
    reducer: {
        user: UserSlice,
        audio: AudioSlice,
        soundPlayer: SoundPlayerSlice,
        soundPlayer2: SoundPlayerSlice2,
    }
})

export default store