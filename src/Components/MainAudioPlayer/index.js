// import React, { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import { MixerButton, PauseButton, PlayButton } from "../../Assets/svg";
// import "./style.css";
// import BASEURL from "../../Config/global";

// const MainAudioPlayer = (props) => {
//   const audioRef = useRef(null);
//   const audioSource = useSelector((state) => state.audio.audioSource);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.5);

//   useEffect(() => {
//     if (audioSource) {
//       audioRef.current.src = BASEURL + audioSource;
//       audioRef.current.load();
//       setIsPlaying(true)
//     }
//   }, [audioSource]);

//   const handlePlay = () => {
//     if(audioSource) {
//       setIsPlaying(true);
//       audioRef.current.play();
//     }
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     audioRef.current.pause();
//   };

//   const handleVolumeChange = (e) => {
//     const volumeLevel = parseFloat(e.target.value);
//     setVolume(volumeLevel);
//     audioRef.current.volume = volumeLevel;
//   };

//   return (
//     <>
//       <div className={`audioPlayerWrapper ${props.menuClass}`}>
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <div className="audioPlayerControls">
//                 {isPlaying ? (
//                   <button
//                     className="playButton playerAction"
//                     onClick={handlePause}
//                   >
//                     <PauseButton />
//                     <p>Pause</p>
//                   </button>
//                 ) : (
//                   <button
//                     className="playButton playerAction"
//                     onClick={handlePlay}
//                   >
//                     <PlayButton />
//                     <p>Play</p>
//                   </button>
//                 )}
//                 {audioSource && (
//                   <audio
//                     loop
//                     controls
//                     autoPlay
//                     ref={audioRef}
//                     className="d-none"
//                   >
//                     <source
//                       src={`${BASEURL + audioSource}`}
//                       type="audio/wav"
//                     />
//                     Your browser does not support the audio element.
//                   </audio>
//                 )}
//                 <div className="playerVolume">
//                   <input
//                     type="range"
//                     min="0"
//                     max="1"
//                     step="0.01"
//                     value={volume}
//                     onChange={handleVolumeChange}
//                   />
//                 </div>
//                 {/* <button className="mixerButton playerAction">
//                   <MixerButton />
//                   <p>Mixer</p>
//                 </button> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default MainAudioPlayer;
