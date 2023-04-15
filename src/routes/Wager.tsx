import * as React from "react";
import { Box, Button, Grid, IconButton, Input, TextField, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Space from "../assets/Space/Space.svg";
import MaskedText from "../components/MaskedText";
import WageringBG from "../assets/Wager/WageringBG.png";
import { MusicButton } from "../components/MusicButton";
import { PageProps } from "../config/Router";
import searchbar from "../assets/Wager/searchbar.png";
import { LeaderboardData, getLeaderboardData, getLeaderboardDataQuery } from "../utils/APIConnection";

interface WagerSearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  wager: number;
  setWager: React.Dispatch<React.SetStateAction<number>>;
}
const LeaderboardEntry = (props: LeaderboardData) => {
  const { displayName, date, score } = props;
  return (
    <Grid container>
      <Grid item xs={8} sx={{ alignContent: "flex-start", height: "1.5vh", margin: "-2px", paddingTop: "5px" }}>
        <Typography sx={{ fontFamily: "Joystix", fontSize: "100%", color: "white", textAlign: "left" }}>
          {displayName}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ borderLeft: "3px solid white", paddingTop: "5px" }}>
          <Typography sx={{ fontFamily: "Joystix", fontSize: "100%", color: "white", textAlign: "center" }}>
            {date}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ borderLeft: "3px solid white", paddingTop: "5px" }}>
          <Typography sx={{ fontFamily: "Joystix", fontSize: "100%", color: "white", textAlign: "center" }}>
            {score}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const WagerSearch = (props: WagerSearchProps) => {
  const { query, setQuery, wager, setWager } = props;
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardData[]>();
  const [startInd, setStartInd] = React.useState(0);
  const [endInd, setEndInd] = React.useState(0);
  React.useEffect(() => {
    const data = getLeaderboardData(10);
    setLeaderboard(data);
    console.log(data.pop());
  }, []);
  return (
    <Grid
      container
      sx={{
        height: "60vh",
        width: "100vw",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        sx={{
          backgroundImage: `url(${WageringBG})`,
          backgroundSize: "100% 100%",
          height: "60vh",
          width: "90vw",
          paddingTop: "3vh",
          justifyContent: "center",
          display: "block",
        }}
      >
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid
            container
            sx={{
              backgroundImage: `url(${searchbar})`,
              backgroundSize: "100% 100%",
              height: "6vh",
              width: "77vw",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 10px 10px 10px",
            }}
          >
            <Grid
              item
              xs={0.75}
              sx={{
                // align in the middle of the search bar
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <SearchIcon />
            </Grid>
            <Grid item xs={11.25}>
              <TextField
                sx={{
                  height: "6vh",
                  width: "100%",
                }}
                variant="standard"
                InputProps={{
                  style: {
                    fontFamily: "Joystix",
                    fontSize: "100%",
                    color: "black",
                    outline: "none",
                    marginBottom: "-15px",
                  },
                  disableUnderline: false,
                }}
                onChange={(event) => {
                  setLeaderboard(getLeaderboardDataQuery(startInd, endInd, query));
                  setQuery(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ paddingLeft: "100px", paddingRight: "100px", display: "block", marginTop: "20px" }}>
            <Grid container sx={{ marginLeft: "-4px" }}>
              <Grid item xs={8}>
                <Box sx={{ borderBottom: "3px solid white", paddingLeft: "10px", paddingBottom: "10px" }}>
                  <MaskedText text="Wallets" fontSize="1rem" />
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box
                  sx={{
                    borderLeft: "3px solid white",
                    borderBottom: "3px solid white",
                    paddingLeft: "5px",
                    paddingBottom: "10px",
                  }}
                >
                  <MaskedText text="Date" fontSize="1rem" />
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box
                  sx={{
                    borderLeft: "3px solid white",
                    borderBottom: "3px solid white",
                    paddingLeft: "5px",
                    paddingBottom: "10px",
                  }}
                >
                  <MaskedText text="Score" fontSize="1rem" />
                </Box>
              </Grid>
            </Grid>
            {leaderboard?.map((data: LeaderboardData) => (
              <LeaderboardEntry {...data} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Wager = (props: PageProps) => {
  const { sound, musicPlaying, setMusicPlaying, account } = props;
  const navigate = useNavigate();

  const [query, setQuery] = React.useState("");
  const [wager, setWager] = React.useState(0);
  console.log(query);
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
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
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
            <MusicButton sound={sound} musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} />
          </Grid>
        </Grid>
        <Grid container sx={{ justifyContent: "center", paddingTop: "10px", paddingBottom: "15px" }}>
          <Typography sx={{ fontFamily: "Joystix", fontSize: "1.5rem", color: "white" }}>Wagering</Typography>
        </Grid>
        <WagerSearch query={query} setQuery={setQuery} wager={wager} setWager={setWager} />
      </Grid>
    </div>
  );
};

export default Wager;
