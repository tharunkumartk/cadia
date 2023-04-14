import React from "react";
import { Button, Grid, IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactAudioPlayer from "react-audio-player";
import BaseButton from "../assets/BaseButton.svg";
// import BGMusic from "../assets/BGMusic.mp3";

const MusicButton = () => {
  const songURL = process.env.REACT_APP_IS_DEV
    ? "https://thecadia.xyz/BGMusic.mp3"
    : "http://localhost:3000/BGMusic.mp3";
  const [Sound] = React.useState(new Audio(songURL));
  const [musicPlaying, setMusicPlaying] = React.useState(false);
  Sound.loop = true;
  return (
    <Button
      onClick={() => {
        if (musicPlaying === false) {
          Sound.play();
        } else if (musicPlaying === true) {
          Sound.pause();
        }
        setMusicPlaying(!musicPlaying);
      }}
      variant="contained"
      sx={{
        backgroundColor: "#482c5c",
        margin: "10px",
        "&:hover": {
          backgroundColor: "#6d4d85",
        },
      }}
      disableRipple
    >
      {musicPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
    </Button>
  );
};

export default MusicButton;
