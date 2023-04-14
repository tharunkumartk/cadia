import * as React from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { useNavigate } from "react-router-dom";
import GameLay from "../containers/GameLay";
import Space from "../assets/Space/Space.svg";
import MaskedText from "../components/MaskedText";
import LeaderboardDialog from "../components/Game/LeaderboardDialog";
import MusicButton from "../components/MusicButton";

const Game = () => {
  const navigate = useNavigate();
  const [leaderboardOpen, setLeaderboardOpen] = React.useState<boolean>(false);

  return (
    <div>
      <Grid sx={{ backgroundImage: `url(${Space})` }}>
        <Grid container sx={{ alignContent: "center", alignItems: "center" }}>
          <Grid item xs={5} sx={{ display: "flex", justifyContent: "start" }}>
            <Button onClick={() => navigate("/home")}>
              <KeyboardArrowLeftIcon fontSize="large" sx={{ color: "white" }} />
              <MaskedText text="Back" fontSize="1rem" />
            </Button>
          </Grid>
          <Grid item xs={5.5} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#EB9BD5", margin: "10px" }}
              onClick={() => window.open("https://forms.gle/rSnAWb2AxYE4mB6W6")}
            >
              <Typography
                sx={{
                  fontFamily: "Joystix",
                  fontSize: "1rem",
                  color: "white",
                  // textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                }}
              >
                Feedback
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={1}>
            <MusicButton />
          </Grid>
          <Grid item xs={0.5} sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton aria-label="Settings" onClick={() => setLeaderboardOpen(true)}>
              {/* <img src={SettingsWheel} alt="Settings Button" style={{ width: "3vw" }} /> */}
              <LeaderboardIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
          </Grid>
        </Grid>
        <LeaderboardDialog open={leaderboardOpen} handleClose={() => setLeaderboardOpen(false)} />
      </Grid>
      <GameLay />
    </div>
  );
};

export default Game;
