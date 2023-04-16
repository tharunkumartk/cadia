import * as React from "react";
import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ContractInterface, ethers } from "ethers";
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Alchemy, Network } from "alchemy-sdk";
// eslint-disable-next-line import/no-extraneous-dependencies
import web3 from "web3";
import { Buffer } from "buffer";
import Space from "../assets/Space/Space.svg";
import MaskedText from "../components/MaskedText";
import WageringBG from "../assets/WageringBG.png";
// import { MusicButton } from "../components/MusicButton";
import { PageProps } from "../config/Router";
import searchbar from "../assets/Wager/searchbar.png";
import addressEntry from "../assets/Wager/addressEntry.png";
import WagerEntry from "../assets/Wager/BetThing.png";
import { LeaderboardData, getLeaderboardDataQuery } from "../utils/APIConnection";
import GameBaseButton from "../assets/Game/GameBaseButton.svg";
import ABI from "../utils/abi.json";
import CaptchaDialog from "../components/Game/CaptchaDialog";
import { MusicButton } from "../components/MusicButton";

interface WagerSearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  wager: number;
  setWager: React.Dispatch<React.SetStateAction<number>>;
  leaderboard: LeaderboardData[];
  setLeaderboard: React.Dispatch<React.SetStateAction<LeaderboardData[]>>;
  startInd: number;
  setStartInd: React.Dispatch<React.SetStateAction<number>>;
  endInd: number;
  setEndInd: React.Dispatch<React.SetStateAction<number>>;
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

interface LeaderboardEntryProps {
  displayName: string;
  date: string;
  score: number;
  key?: number;
}

const LeaderboardEntry = (props: LeaderboardEntryProps) => {
  const { displayName, date, score, key } = props;
  return (
    <Grid key={key} container>
      <Grid item xs={8} sx={{ alignContent: "flex-start", height: "1.5vh", margin: "-2px", paddingTop: "5px" }}>
        <Typography
          sx={{ fontFamily: "Minecraft", letterSpacing: "0.1rem", fontSize: "100%", color: "white", textAlign: "left" }}
        >
          {displayName}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ borderLeft: "3px solid white", paddingTop: "5px" }}>
          <Typography
            sx={{
              fontFamily: "Minecraft",
              letterSpacing: "0.1rem",
              fontSize: "100%",
              color: "white",
              textAlign: "center",
            }}
          >
            {date}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ borderLeft: "3px solid white", paddingTop: "5px" }}>
          <Typography
            sx={{
              fontFamily: "Minecraft",
              letterSpacing: "0.1rem",
              fontSize: "100%",
              color: "white",
              textAlign: "center",
            }}
          >
            {score}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const onChangeSearch = async (
  setLeaderboard: React.Dispatch<React.SetStateAction<LeaderboardData[]>>,
  query: string,
  startInd: number,
  endInd: number,
) => {
  const resp = await getLeaderboardDataQuery(startInd, endInd, query);
  console.log(resp);
  setLeaderboard(resp);
};

const WagerSearch = (props: WagerSearchProps) => {
  const { query, setQuery, wager, setWager, leaderboard, setLeaderboard, startInd, setStartInd, endInd, setEndInd } =
    props;

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
          <Grid item xs={0.25} />
          <Grid item xs={9} sx={{ textAlign: "center" }}>
            <Grid
              container
              sx={{
                backgroundImage: `url(${searchbar})`,
                backgroundSize: "100% 100%",
                height: "8.5vh",
                width: "100%",
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
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                <SearchIcon sx={{ color: "white", width: "100%", height: "100%" }} />
              </Grid>
              <Grid item xs={11.25}>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  variant="standard"
                  label="Search for an address"
                  InputLabelProps={{
                    sx: {
                      fontFamily: "Joystix",
                      fontSize: "1rem",
                      color: "white",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "Minecraft",
                      fontSize: "1rem",
                      letterSpacing: "0.1rem",
                      color: "white",
                      outline: "none",
                    },
                    disableUnderline: false,
                  }}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={0.75} sx={{ textAlign: "center" }}>
            <IconButton
              onClick={() => {
                if (endInd > 0 && startInd > 0) {
                  setStartInd(startInd - 9);
                  setEndInd(endInd - 9);
                }
                if (startInd < 0) {
                  setStartInd(0);
                  setEndInd(9);
                }
                onChangeSearch(setLeaderboard, query, startInd, endInd);
              }}
            >
              <ArrowBackIosIcon sx={{ color: "white" }} />
            </IconButton>
          </Grid>
          <Grid item xs={0.75} sx={{ textAlign: "center" }}>
            <IconButton
              onClick={() => {
                setStartInd(startInd + 9);
                setEndInd(endInd + 9);
                onChangeSearch(setLeaderboard, query, startInd, endInd);
              }}
            >
              <ArrowForwardIosIcon sx={{ color: "white" }} />
            </IconButton>
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
            {leaderboard?.map((data: LeaderboardData, index: number) => (
              <LeaderboardEntry
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                date={data.date.substring(5, 11)}
                displayName={data.displayName}
                score={data.score}
              />
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
  account: string;
  setCaptcha: React.Dispatch<React.SetStateAction<boolean>>;
}

const makeBet = async (wager: number, wagerOnAddress: string, proofState: Buffer) => {
  console.log("Wagering");
  if (window.ethereum) {
    const config = {
      apiKey: "OWLoAn_79upNp7SRLpFI43XKioIntk0o",
    };
    // const alchemyProvider = new ethers.providers.AlchemyProvider("arbitrum-goerli", config.apiKey);
    // const signer = new ethers.Wallet(key, alchemyProvider);
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contractAddress = "0x2c49B722a88026D1EaeB6F1D257Fbe3e5BBeEE16";
    const testContract = new ethers.Contract(contractAddress, ABI.abi, signer);
    testContract.owner().then((res: any) => {
      console.log(res);
    });
    // const proof = web3.utils.asciiToHex(
    //   "AAAAAAAAAAAAAAAAUnGbexRhyMpMsr/DrKI2JiHXfrkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAByAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAgedpxhic+7jymE1CmDCMij79i7gkKOQng0rTMUmw8EBghR/m+063jvCLUMytsQYGhuStsLiCekquaT4tXyhE+GvHCSZLYL6CRQVAfIHdgUSu+v7bTkNDSPjEJXtLdLsMkWOue6wSIZnadyL8kdHqwOiolyBmk/RYQ+se/PQwZDCXLo5tC4nja6wxvFppvj1sgX2uZ0/QXhBPTGptUGSLbLxiUWzNiaArsiOPpQYgGT3yNYJkqHAGXZVy7j7xxEOcrDuC2WFH7DAROBhc4oCuM43cTg9xvSVjQnfkzgfcHORikyE2uPMmNTdgGcA1lmaaR425DtySnSPyt8Pk9lHcBGfbhoWITDQ0ru6bKgP2WFV9vBb7fnQmQWkVF6RIr/eEmjzWm2fWrmGIMpCJ3QFx/UUjqd/FBonz6Egm//5gwTQVvyE3aBYMwHO2DHDHm1gM8FEngwX1+Cx7P0mLXUvRcDZxTIZfvSoYCvXnG2ZZniD+CoLJuFcm1NYmRFgwr6Dkqzkjs+NTOoaaYZThBpEeaJD/SZmsxbovfSW6JPf5dwQwJL0Jp/+L6Ci+lhI3tT5J2DDcJYWbx+EmKREkjTOh9HHVXnjPmhgzenEvnXzFERy6xyzFo4GLqtDplamSsWUMFqc8l6Kk4r8fATWLmnJXwp9UlPDcfeax4OreltmK2yxmsaCUKyIVmqX/LlxwvYSniXm4jlitF1h53NIgKVNVEABrBiUNLlVX7TfE2NTtWp9miGwXNTHLwXa0WKnNH/EwvPr0r2qD4qJm+E35afnwKRi8t0ZdltrUcMdctfxBvkieU8mTbb7pfJA1AEVz+EpZcuXYzmbisrMT6CZ1jVNR7AqpmQ86k+LupKOujUdCH2E8hAt3pmmaa5puD5jpABAQGaOku0eD9KJ62Da8DoDQQGE4sHqE9UyQudwlQ/DkQDg+7+401NMc/826oQyvcemxl8NsZzPgj6e9zYiCM3CiQKDrHLrfg5IOzmceeQBQ66e8ngCEHONeixLRsoVzWOWMdplUrxAihhaiT4eZB/u8P931x9r6rX3FPTkNQ+Swk5y1uUD45YCUHnhUNAxXGdtHJtPj63gejrWDpGIdHpv8RLjRL5fPx7XmLlDiK6v1vtarrpSZcHeWYlOnUxD6smQAuNEvl8/HteYuUOIrq/W+1quulJlwd5ZiU6dTEPqyZACDHgraDXN3I0c5B8FiMpQhMC+SI4F7AXpEmmGXqZInLHodCZ4W6BpTNK4vbnJ3RzEbLJu8AHE9oZMjOIywQe18H6RXn2HtThkxSoZOFPNeAIbhIEXnL4jP43qdOQOxzaQNXJXKdtXirKDWhR/6zVe7D8WEPjN3MV/uVn2oKSbqpLPCsDtb7d/NOvEses+aF31twpv7AXCskb/ukfEXd8YwDnvt0LGa21JoZkrDnrfyc7IAfRBeERX7GtWRGqYEXYhBX0eUt++EaMYRmHTXwwNE2+zHXD3l8+pz7A5rqTVpLCZcwx9aAwgNqd4c0Wev8M3X7gL97zy7hJfZIcDhCN/8MoBUKLMM6IBABVNy6x8HYkw/Wogrza+FfDxe8YXlNEg==",
    // );
    await testContract.makeBets(ethers.utils.parseEther(wager.toString()), wagerOnAddress, proofState, {
      value: ethers.utils.parseEther(wager.toString()),
      gasLimit: 500000,
    });
    await testContract.getseasonEndTimestamp().then((res: any) => {
      console.log(res);
    });

    await testContract.getTotalBets().then((res: any) => {
      console.log(res);
    });
  }
};

const MakeWager = (props: MakeWagerProps) => {
  const { wager, setWager, wagerOnAddress, setWagerOnAddress, account, setCaptcha } = props;
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
                fontFamily: "Minecraft",
                fontSize: "100%",
                letterSpacing: "0.1rem",
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
            value={Number(wager.toString())}
            type="number"
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
              setWager(Number(event.target.value.toString()));
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={1.5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <WagerButton text="Wager" onClick={() => setCaptcha(true)} />
      </Grid>
    </Grid>
  );
};

const Wager = (props: PageProps) => {
  const { sound, musicPlaying, setMusicPlaying, account } = props;
  const navigate = useNavigate();
  const [wagerOnAddress, setWagerOnAddress] = React.useState("");
  const [query, setQuery] = React.useState(" ");
  const [wager, setWager] = React.useState(0);
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardData[]>([]);
  const [startInd, setStartInd] = React.useState(0);
  const [endInd, setEndInd] = React.useState(9);
  const [captcha, setCaptcha] = React.useState<boolean>(false);
  const [proofState, setProofState] = React.useState<Buffer>(Buffer.from("0x"));
  React.useEffect(() => {
    onChangeSearch(setLeaderboard, query, startInd, endInd);
  }, [query]);
  return (
    <div>
      <CaptchaDialog
        open={captcha}
        handleClose={() => {
          makeBet(wager, wagerOnAddress, proofState);
          setCaptcha(false);
        }}
        closeCaptcha={() => setCaptcha(false)}
        account={account}
        setProofState={setProofState}
      />
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
            <Grid item sx={{ margin: "0 10px", alignItems: "center" }}>
              <MusicButton sound={sound} musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} />
            </Grid>
          </Grid>
          <Grid container sx={{ justifyContent: "center", paddingTop: "10px", paddingBottom: "15px" }}>
            <Typography sx={{ fontFamily: "Joystix", fontSize: "1.5rem", color: "white" }}>Wagering</Typography>
          </Grid>
          <WagerSearch
            query={query}
            setQuery={setQuery}
            wager={wager}
            setWager={setWager}
            leaderboard={leaderboard}
            setLeaderboard={setLeaderboard}
            startInd={startInd}
            setStartInd={setStartInd}
            endInd={endInd}
            setEndInd={setEndInd}
          />
          <MakeWager
            wager={wager}
            setWager={setWager}
            wagerOnAddress={wagerOnAddress}
            setWagerOnAddress={setWagerOnAddress}
            account={account}
            setCaptcha={setCaptcha}
          />
        </Grid>
      </div>
    </div>
  );
};

export default Wager;
