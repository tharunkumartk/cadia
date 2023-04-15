/* eslint-disable prettier/prettier */
import * as React from "react";
import { Grid } from "@mui/material";
import Ground from "../assets/Home/Ground.png";
import City from "../assets/Home/City.svg";
import Clouds from "../assets/Home/Clouds.svg";

interface SpaceProps {
  children?: React.ReactNode;
}

const Space = ({ children }: SpaceProps) => {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        alignContent: "start",
      }}
    >
      <Grid
        item
        xs={12}
        style={{
          background: "linear-gradient(180deg, #8E32B3 0%, #FFB2DD 100%)",
          backgroundSize: "contain",
          height: "100vh",
          width: "100vw",
          top: "0vh",
          position: "fixed",
          zIndex: -2,
        }}
      />
      {children}
      <Grid
        item
        xs={12}
        style={{
          backgroundImage: `url(${Clouds})`,
          backgroundSize: "100% 100%",
          top: "3vh",
          height: "40vh",
          width: "100vw",
          position: "fixed",
          zIndex: -1,
        }}
      />
      <Grid
        item
        xs={10}
        style={{
          backgroundImage: `url(${City})`,
          backgroundSize: "100% 100%",
          height: "65vh",
          width: "100vw",
          bottom: "5vh",
          left: "3vw",
          position: "fixed",
          zIndex: -1,
        }}
      />
      <Grid
        item
        xs={12}
        style={{
          backgroundImage: `url(${Ground})`,
          backgroundSize: "cover",
          height: "30vh",
          width: "100vw",
          bottom: 0,
          left: 0,
          position: "fixed",
          zIndex: -1,
        }}
      />
    </Grid>
  );
};

export default Space;
