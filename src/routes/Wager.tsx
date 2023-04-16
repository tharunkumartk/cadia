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
import addressEntry from "../assets/Wager/addressEntry.png";
import WagerEntry from "../assets/Wager/BetThing.png";
import { LeaderboardData, getLeaderboardData, getLeaderboardDataQuery } from "../utils/APIConnection";
import CustomButton from "../components/CustomButton";
import GameButton from "../components/Game/GameButton";
import GameBaseButton from "../assets/Game/GameBaseButton.svg";

interface WagerSearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  wager: number;
  setWager: React.Dispatch<React.SetStateAction<number>>;
}

interface WagerButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const WagerButton = ({ text, onClick, disabled }: WagerButtonProps) => {
  return (
    <Grid container sx={{ margin: "20px" }}>
      <Button
        onClick={onClick}
        sx={{
          backgroundImage: `url(${GameBaseButton})`,
          backgroundSize: "100% 100%",
          width: "15vw",
          height: "10vh",
          opacity: disabled ? "50%" : "100%",
          cursor: disabled ? "default" : "pointer",
          display: "block",
        }}
        disabled={disabled}
      >
        <MaskedText text={text} fontSize="1.25rem" />
      </Button>
    </Grid>
  );
};

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
                  width: "100%",
                  justifyItems: "center",
                }}
                variant="standard"
                label="Search for an address"
                InputLabelProps={{
                  sx: {
                    fontFamily: "Joystix",
                    fontSize: ".5rem",
                    color: "white",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "Joystix",
                    fontSize: "1rem",
                    color: "white",
                    outline: "none",
                  },
                  disableUnderline: false,
                }}
                onChange={(event) => {
                  console.log(leaderboard);
                  setQuery(event.target.value);
                  console.log(query);
                  setLeaderboard(getLeaderboardDataQuery(0, 50, query));
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
              <LeaderboardEntry date={data.date.substring(5, 11)} displayName={data.displayName} score={data.score} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

interface MakeWagerProps {
  wager: number;
  setWager: React.Dispatch<React.SetStateAction<number>>;
  wagerOnAddress: string;
  setWagerOnAddress: React.Dispatch<React.SetStateAction<string>>;
}

const MakeWager = (props: MakeWagerProps) => {
  const { wager, setWager, wagerOnAddress, setWagerOnAddress } = props;
  return (
    <Grid
      container
      sx={{
        height: "20vh",
        width: "100vw",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          backgroundImage: `url(${addressEntry})`,
          backgroundSize: "100% 100%",
          height: "10vh",
          width: "50vw",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <Grid item xs={11} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <TextField
            sx={{
              width: "100%",
              justifyItems: "center",
              marginLeft: "20px",
              marginTop: "15px",
            }}
            label="Enter address"
            InputLabelProps={{
              sx: {
                fontFamily: "Joystix",
                fontSize: "100%",
                color: "white",
              },
            }}
            variant="standard"
            InputProps={{
              style: {
                fontFamily: "Joystix",
                fontSize: "100%",
                color: "white",
              },
            }}
            onChange={(event) => {
              setWagerOnAddress(event.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={1.5}
        sx={{
          backgroundImage: `url(${WagerEntry})`,
          backgroundSize: "100% 100%",
          height: "10vh",
          width: "50vw",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <Grid item xs={10} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <TextField
            sx={{
              width: "100%",
              justifyItems: "center",
              marginLeft: "20px",
              marginTop: "15px",
            }}
            label="ETH AMT"
            InputLabelProps={{
              sx: {
                fontFamily: "Joystix",
                fontSize: "100%",
                color: "white",
              },
            }}
            variant="standard"
            value={wager}
            InputProps={{
              style: {
                fontFamily: "Joystix",
                fontSize: "100%",
                color: "white",
                outline: "none",
                marginBottom: "-15px",
              },
              disableUnderline: false,
            }}
            onChange={(event) => {
              const numericValue = event.target.value.replace(/[^0-9]/g, ""); // remove non-numeric characters
              setWager(Number(numericValue));
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={1.5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <WagerButton text="Wager" onClick={() => {}} />
      </Grid>
    </Grid>
  );
};

const Wager = (props: PageProps) => {
  const { sound, musicPlaying, setMusicPlaying, account } = props;
  const navigate = useNavigate();
  const [wagerOnAddress, setWagerOnAddress] = React.useState("");
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
        <MakeWager
          wager={wager}
          setWager={setWager}
          wagerOnAddress={wagerOnAddress}
          setWagerOnAddress={setWagerOnAddress}
        />
      </Grid>
    </div>
  );
};

export default Wager;
