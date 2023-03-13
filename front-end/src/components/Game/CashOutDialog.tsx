import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton, Modal, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import ConfirmCashOut from "../../assets/Game/ConfirmCashOut.svg";
import ExitCashOut from "../../assets/Game/ExitCashOut.svg";
import { pushLeaderboardData } from "../../utils/APIConnection";
import { UserContext } from "../../contexts";

interface CashOutDialogProps {
  open: boolean;
  userScore: number;
  handleClose: () => void;
  resetGameState: (arg0: boolean) => void;
}

const CashOutDialog = ({ open, userScore, handleClose, resetGameState }: CashOutDialogProps) => {
  const navigate = useNavigate();
  const { currentUser } = React.useContext(UserContext);

  const SubmitandExit = () => {
    // console.log("submit and exit");
    // if (currentUser) return;
    // pushLeaderboardData({
    //   name: currentUser.ProfileEntryResponse.Username,
    //   score: userScore,
    //   walletId: currentUser.PublicKeyBase58Check,
    // });
    navigate("/home");
  };

  const SubmitandRestart = () => {
    // console.log("submit and restart");
    // if (currentUser) return;
    // pushLeaderboardData({
    //   name: currentUser.ProfileEntryResponse.Username,
    //   score: userScore,
    //   walletId: currentUser.PublicKeyBase58Check,
    // });
    resetGameState(true);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Slide in={open} direction="left">
        <Grid
          container
          sx={{
            backgroundColor: "#402F5C",
            width: "60vw",
            height: "20vh",
            position: "absolute",
            right: 0,
            alignItems: "center",
          }}
        >
          <Grid item xs={7} sx={{ marginLeft: "1vw" }}>
            <Typography sx={{ fontFamily: "Joystix", color: "white" }}>
              You are about to submit your score. your score will be recorded, but you will not able to continue playing
              with your coins. are you sure?
            </Typography>
          </Grid>
          <Grid item flexGrow={1} />
          {/* need to change icons to represent two clicks */}
          <Grid item xs={2}>
            <IconButton onClick={SubmitandExit}>
              <img src={ConfirmCashOut} alt="Submit Score and Exit" style={{ width: "4vw" }} />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={SubmitandRestart}>
              <img src={ConfirmCashOut} alt="Submit Score and Restart" style={{ width: "4vw" }} />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={handleClose}>
              <img src={ExitCashOut} alt="Cancel cash out" style={{ width: "4vw" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Slide>
    </Modal>
  );
};

export default CashOutDialog;
