import * as React from "react";
import { Button, Grid, Typography, Modal, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PokerTableImage from "../../assets/pokertable.svg";
import GoldPotImg from "../../assets/goldpot.svg";
import CoinImg from "../../assets/coin.svg";
import GameBaseButton from "../../assets/Game/GameBaseButton.svg";
import CashOutBack from "../../assets/cashoutback.svg";
import "../../styles/game.css";
import MaskedText from "../MaskedText";
import CardEntity from "../../assets/cards/CardEntity";
import { GameState } from "../../engine/game";
import convertCardstoStrings from "../../engine/cardconversion";
// import CashOutDialog from "./CashOutDialog";
import { pushLeaderboardData } from "../../utils/APIConnection";
import { UserContext } from "../../config/UserContext";
import ChatDialog, { Message } from "./ChatDialog";
import CashOutDialog from "./CashOutDialog";
import LeaderboardDialog from "./LeaderboardDialog";

interface GameEndProps {
  open: boolean;
  handleClose: () => void;
  resetGameState: (arg0: boolean) => void;
  gameState: GameState;
  pot: number;
  balance: number;
  result: string;
  messageData: Message[];
}
interface NextGameButtonProps {
  resetGameState: (arg0: boolean) => void;
  handleClose: () => void;
  gameState: GameState;
}
interface CashOutButtonProps {
  userScore: number;
}

const NextGameButton = ({ resetGameState, handleClose, gameState }: NextGameButtonProps) => {
  const forNextTournamentbutnotNextGame = gameState.players[0].balance === 0;
  return (
    <Button
      onClick={() => {
        resetGameState(forNextTournamentbutnotNextGame);
        handleClose();
      }}
      sx={{
        backgroundImage: `url(${GameBaseButton})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "15vw",
        height: "10vh",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      {!forNextTournamentbutnotNextGame && <MaskedText text="Continue" fontSize="1.25rem" />}
      {forNextTournamentbutnotNextGame && <MaskedText text="Restart" fontSize="1.5rem" />}
    </Button>
  );
};

const CashOutButton = ({ userScore }: CashOutButtonProps) => {
  const navigate = useNavigate();
  const { currentUser } = React.useContext(UserContext);

  const SubmitAndExit = () => {
    if (!currentUser) return;
    pushLeaderboardData({
      // temporary fix by using bracket notation w/ rule disabling to avoid errors because currentUser
      // is of type "never" due to the deso guy's code

      // eslint-disable-next-line @typescript-eslint/dot-notation
      name: currentUser["ProfileEntryResponse"]["Username"],
      score: userScore,
      // eslint-disable-next-line @typescript-eslint/dot-notation
      walletId: currentUser["PublicKeyBase58Check"],
    });
    navigate("/home");
  };

  return (
    <Button
      onClick={SubmitAndExit}
      sx={{
        backgroundImage: `url(${CashOutBack})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "15vw",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Joystix",
          fontSize: "1.25rem",
          // textShadow: "0px 4px 0px #5D0A9D",
          color: "white",
        }}
      >
        Cash Out
      </Typography>
    </Button>
  );
};

const GameEnd = ({ open, handleClose, resetGameState, gameState, pot, balance, result, messageData }: GameEndProps) => {
  // TODO: should return a screen maybe, not just null
  if (gameState.players.length === 0) return null;
  const ChatGPTCards = convertCardstoStrings(gameState.players[1].hand);
  const UserCards = convertCardstoStrings(gameState.players[0].hand);
  const CommunityCards = convertCardstoStrings(gameState.table);
  const [messageOpen, setMessageOpen] = React.useState<boolean>(false);
  const [cashOutDialogOpen, setCashOutDialogOpen] = React.useState<boolean>(false);
  const [leaderboardOpen, setLeaderboardOpen] = React.useState<boolean>(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <div>
        <Grid
          container
          sx={{
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item sx={{ width: "80vw", height: "90vh", position: "fixed", left: "10vw", top: "5vh", zIndex: "-1" }}>
            <img src={PokerTableImage} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </Grid>

          <Grid
            container
            sx={{ width: "100vw", justifyContent: "center", alignContent: "center", alignItems: "center" }}
          >
            <Grid
              item
              xs={4}
              sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center" }}
            >
              <Typography
                sx={{
                  fontFamily: "Joystix",
                  fontSize: "2.5rem",
                  textShadow: "0px 4px 0px #5D0A9D",
                  color: "white",
                  height: "10vh",
                }}
              >
                ChatGPT
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center" }}
            >
              <Typography
                sx={{
                  fontFamily: "Joystix",
                  fontSize: "2.5rem",
                  textShadow: "0px 4px 0px #5D0A9D",
                  color: "white",
                  height: "10vh",
                }}
              >
                You
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: "100vw", justifyContent: "center", alignContent: "center", alignItems: "center" }}
          >
            <Grid item xs={1} />
            <Grid
              item
              xs={1.5}
              sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center" }}
            >
              <CardEntity className="endgame-card" card={ChatGPTCards[0]} />
            </Grid>
            <Grid
              item
              xs={1.5}
              sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center" }}
            >
              <CardEntity className="endgame-card" card={ChatGPTCards[1]} />
            </Grid>
            <Grid
              item
              xs={1.5}
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img src={GoldPotImg} style={{ width: "10vw", height: "10vh" }} alt="Gold Pot" />
              <Typography
                sx={{
                  fontFamily: "Joystix",
                  fontSize: "1.5rem",
                  textShadow: "0px 4px 0px #5D0A9D",
                  color: "white",
                }}
              >
                {pot}
              </Typography>
            </Grid>
            <Grid
              item
              xs={1.5}
              sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center" }}
            >
              <CardEntity className="endgame-card" card={UserCards[0]} />
            </Grid>
            <Grid
              item
              xs={1.5}
              sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center" }}
            >
              <CardEntity className="endgame-card" card={UserCards[1]} />
            </Grid>
            <Grid item xs={1} />
          </Grid>
          <Grid
            item
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              height: "40vh",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container>
              <Grid
                xs={3.5}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "black", margin: "10px" }}
                  onClick={() => setMessageOpen(true)}
                >
                  <MessageRoundedIcon
                    fontSize="large"
                    sx={{ color: "white", margin: "5px 5px 5px 0px", height: "1.5rem" }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Joystix",
                      fontSize: "1rem",
                      color: "white",
                      // textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                    }}
                  >
                    Messages
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "black", margin: "10px" }}
                  onClick={() => setLeaderboardOpen(true)}
                >
                  <LeaderboardIcon
                    fontSize="large"
                    sx={{ color: "white", margin: "5px 5px 5px 0px", height: "1.5rem" }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Joystix",
                      fontSize: "1rem",
                      color: "white",
                      // textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                    }}
                  >
                    Leaderboard
                  </Typography>
                </Button>
              </Grid>
              <Grid
                item
                xs={5}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
              >
                <Typography
                  sx={{
                    fontFamily: "Joystix",
                    fontSize: "1.0rem",
                    textShadow: "0px 4px 0px #5D0A9D",
                    color: "white",
                    marginTop: "100px",
                    marginBottom: "15px",
                    textAlign: "center",
                  }}
                >
                  {result}
                </Typography>
                <NextGameButton resetGameState={resetGameState} handleClose={handleClose} gameState={gameState} />
              </Grid>
              <Grid
                item
                xs={3.5}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "15vw",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img src={CoinImg} style={{ height: "1.5rem", marginRight: "10px" }} alt="Coin" />
                  <Typography
                    sx={{
                      fontFamily: "Joystix",
                      fontSize: "1.0rem",
                      textShadow: "0px 4px 0px #5D0A9D",
                      color: "white",
                    }}
                  >
                    Balance {balance}
                  </Typography>
                </Grid>
                <Button
                  onClick={() => setCashOutDialogOpen(true)}
                  sx={{
                    backgroundImage: `url(${CashOutBack})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "10vw",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Joystix",
                      fontSize: "1rem",
                      // textShadow: "0px 4px 0px #5D0A9D",
                      color: "white",
                    }}
                  >
                    Cash Out
                  </Typography>{" "}
                </Button>
              </Grid>
            </Grid>

            <Grid container className="community-cards" sx={{ height: "20vh" }}>
              <CardEntity card={CommunityCards[0]} />
              <CardEntity card={CommunityCards[1]} />
              <CardEntity card={CommunityCards[2]} />
              <CardEntity card={CommunityCards[3]} />
              <CardEntity card={CommunityCards[4]} />
            </Grid>
          </Grid>
        </Grid>
        <ChatDialog open={messageOpen} handleClose={() => setMessageOpen(false)} messageData={messageData} />
        <LeaderboardDialog open={leaderboardOpen} handleClose={() => setLeaderboardOpen(false)} />

        <CashOutDialog open={cashOutDialogOpen} handleClose={() => setCashOutDialogOpen(false)} userScore={balance} />
      </div>
    </Modal>
  );
};

export default GameEnd;
