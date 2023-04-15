import React from "react";
import { Button } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

export interface MusicButtonProps {
  sound: HTMLAudioElement;
  musicPlaying: boolean;
  setMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MusicButton = (props: MusicButtonProps) => {
  const { sound, musicPlaying, setMusicPlaying } = props;
  sound.loop = true;
  return (
    <Button
      onClick={() => {
        if (musicPlaying === false) {
          sound.play();
        } else if (musicPlaying === true) {
          sound.pause();
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
