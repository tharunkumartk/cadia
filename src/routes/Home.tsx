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

const Home = () => {
  const navigate = useNavigate();
  // add isLoading later
  const { currentUser } = React.useContext(UserContext);

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
        </Grid>
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
        <CustomButton text="START" disabled={!currentUser} onClick={() => navigate("/game")} />
      </Grid>
    </Space>
  );
};

export default Home;
