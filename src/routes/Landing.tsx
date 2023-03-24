import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Astronaut from "../assets/Home/Astronaut.svg";
import Scientist from "../assets/Home/Scientist.svg";
import Space from "../containers/Space";
import CustomButton from "../components/CustomButton";
import MaskedText from "../components/MaskedText";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Space>
      <Grid
        item
        xs={12}
        sx={{ height: "40vh", display: "flex", flexDirection: "column", justifyContent: "end", zIndex: 1 }}
      >
        <MaskedText text="Cadia" fontSize="7rem" shadow />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ height: "10vh", display: "flex", flexDirection: "column", justifyContent: "end", zIndex: 1 }}
      >
        <Typography
          sx={{
            fontFamily: "Joystix",
            fontSize: "2.5rem",
            color: "white",
            textShadow: "0px 4px 0px #5D0A9D",
          }}
        >
          Play the game win the chain
        </Typography>
      </Grid>

      <Grid container spacing={2} sx={{ height: "32vh", justifyContent: "center", alignItems: "flex-end", zIndex: 1 }}>
        <Grid item xs={4}>
          <img src={Astronaut} style={{ height: "20vh", width: "10vw" }} alt="Astronaut" />
        </Grid>
        <CustomButton text="Coming Soon" disabled onClick={() => {}} />
        <Grid item xs={4}>
          <img src={Scientist} style={{ height: "20vh", width: "10vw" }} alt="Astronaut" />
        </Grid>
      </Grid>
    </Space>
  );
};

export default Landing;
