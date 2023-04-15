import * as React from "react";
import { Grid, Typography, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { identity } from "@deso-core/identity";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { getDisplayName } from "../helpers";
import Space from "../containers/Space";
import CustomButton from "../components/CustomButton";
// import MaskedText from "../components/MaskedText";
import Rules from "../assets/Home/Rules.svg";
import { UserContext } from "../config/UserContext";
import { MusicButton } from "../components/MusicButton";
import { requestLogin, requestLogout } from "../utils/MetaMaskLoginFunctions";
import { PageProps } from "../config/Router";
import BaseButton from "../assets/BaseButton.svg";
import MaskedText from "../components/MaskedText";

interface EnterButtonProps {
  disabled: boolean;
  onClick: any;
  text: string;
}

const EnterButton = (props: EnterButtonProps) => {
  const { disabled, onClick, text } = props;
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      sx={{
        backgroundImage: `url(${BaseButton})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        width: "15vw",
        height: "20vh",
        // temporary disabled styling
        filter: disabled
          ? "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale\")"
          : "none",
      }}
    >
      <MaskedText text={text} fontSize="1.25rem" />
    </Button>
  );
};

const Home = (props: PageProps) => {
  const { sound, musicPlaying, setMusicPlaying, account, setAccount } = props;
  const navigate = useNavigate();
  // add isLoading later
  return (
    <Space>
      <Grid container>
        <Grid container sx={{ alignItems: "center", justifyContent: "right" }}>
          <Grid item sx={{ margin: "0 10px", alignItems: "center" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#EB9BD5" }}
              onClick={() => window.open("https://openfund.com/d/Cadia?invite=XTMhK24k")}
            >
              <Typography
                sx={{
                  fontFamily: "Joystix",
                  fontSize: "1rem",
                  color: "white",
                  // textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                }}
              >
                Our Openfund
              </Typography>
            </Button>
          </Grid>
          <Grid item sx={{ display: "flex", justifyContent: "start" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#861E1E",
                margin: "10px",
                "&:hover": {
                  backgroundColor: "#E14F4F",
                },
              }}
              onClick={() => window.open("https://youtu.be/iCJd_KvJAMc")}
            >
              <YouTubeIcon sx={{ height: "1.5rem", marginRight: "10px" }} />
              <Typography
                sx={{
                  fontFamily: "Joystix",
                  fontSize: "1rem",
                  color: "white",
                  // textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                }}
              >
                Demo Video
              </Typography>
            </Button>
          </Grid>
          <Grid item flexGrow={1} />
          <Grid item xs={1}>
            <MusicButton sound={sound} musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} />
          </Grid>
          {/*            *************** DESO LOGIN ******************
          <Grid item>
            {currentUser && (
              <Typography sx={{ fontFamily: "Joystix", color: "white" }}>{getDisplayName(currentUser)}</Typography>
            )}
          </Grid>
          <Grid item sx={{ margin: "0 10px" }}>
            {currentUser ? (
              <IconButton onClick={() => identity.logout()} size="large">
                <LogoutIcon sx={{ fontSize: "2.5rem", color: "white" }} />
              </IconButton>
            ) : (
              <IconButton onClick={() => identity.login()} size="large">
                <LoginIcon sx={{ fontSize: "2.5rem", color: "white" }} />
              </IconButton>
            )}
          </Grid>
          <Grid item sx={{ margin: "0 10px" }}>
            {currentUser ? (
              <IconButton onClick={() => identity.logout()} size="large">
                <LogoutIcon sx={{ fontSize: "2.5rem", color: "white" }} />
              </IconButton>
            ) : (
              <IconButton onClick={() => identity.login()} size="large">
                <LoginIcon sx={{ fontSize: "2.5rem", color: "white" }} />
              </IconButton>
            )}
          </Grid> */}
          <Grid item>
            {account !== "" && <Typography sx={{ fontFamily: "Joystix", color: "white" }}>{account}</Typography>}
          </Grid>
          <Grid item sx={{ margin: "0 10px" }}>
            {account !== "" ? (
              <IconButton onClick={() => requestLogout(setAccount)} size="large">
                <LogoutIcon sx={{ fontSize: "2.5rem", color: "white" }} />
              </IconButton>
            ) : (
              <IconButton onClick={() => requestLogin(setAccount)} size="large">
                <LoginIcon sx={{ fontSize: "2.5rem", color: "white" }} />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              backgroundImage: `url(${Rules})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "60vh",
              margin: "20px 0 0 0",
            }}
          />
        </Grid>
        <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
          <Grid item xs={2}>
            <EnterButton text="START" disabled={account === ""} onClick={() => navigate("/game")} />
          </Grid>
          <Grid item xs={2}>
            <EnterButton text="WAGER" disabled={account === ""} onClick={() => navigate("/wager")} />
          </Grid>
        </Grid>
      </Grid>
    </Space>
  );
};

export default Home;
