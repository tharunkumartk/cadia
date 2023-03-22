import { ScoreSharp } from "@mui/icons-material";
import axios from "axios";
import { Card } from "../engine/Card";

// confusing, should change later
const BASE_URL = process.env.REACT_APP_IS_DEV ? "http://localhost:8080" : "https://www.thecadia.xyz";

interface LeaderboardData {
  displayName: string;
  score: number;
}

interface LeaderboardDataStore {
  created_at: string;
  name: string;
  score: number;
  user_wallet: string;
}

// gets the leaderboard data from backend. need to update url to local machine
const getLeaderboardData = (scoreCount: number) => {
  const leaderboardDataReturn: LeaderboardData[] = [];
  axios
    .get<LeaderboardData[]>(`${BASE_URL}/leaderboard`, {
      params: {
        count: scoreCount,
      },
    })
    .then((res) => {
      console.log(res);
      const scores = res.data;
      scores.forEach((score: any) => {
        leaderboardDataReturn.push({displayName: score.name, score: score.score });
      });
    });
  return leaderboardDataReturn;
};

// pushing a new leaderboard score
interface PushLeaderboardDataProps {
  name: string;
  score: number;
  walletId: string;
}

const pushLeaderboardData = ({ name, score, walletId }: PushLeaderboardDataProps) => {
  axios
    .post(`${BASE_URL}/leaderboard`, {
      name: name,
      score: score,
      walletId: walletId,
    })
    .then((res) => {
      return res;
    });
};

interface PushGameStartProps {
  name: string;
  walletId: string;
}

const pushGameStartData = ({ name, walletId }: PushGameStartProps) => {
  axios
    .post(`${BASE_URL}/event/game_start`, {
      name: name,
      walletId: walletId,
    })
    .then((res) => {
      return res;
    });
};

// getting prompt for chatGPT without card information
const getChatGPTPrompt = async (
  communityCards: Array<Card>,
  gptCards: Array<Card>,
  playerMoney: number,
  pastRounds: Array<Number>,
  chatGPTisBigBlind: boolean,
  opponentBet: number,
  chatGPTCurrentBet: number,
  bigBlindAmount: number,
) => {
  let ret = "";
  try {
    const response = await axios.post(`${BASE_URL}/chatgpt_prompt`, {
      money: playerMoney,
      cards: gptCards,
      community: communityCards,
      bet: opponentBet,
      isBigBlind: chatGPTisBigBlind,
      past_rounds: pastRounds,
      chatGPTCurrentBet,
      bigBlindAmount,
    });
    // console.log(`prompt: ${response.data.prompt}`);
    ret = response.data.prompt;
  } catch (error) {
    console.log("error: ", error);
  }
  return ret;
};

// getting chatGPT response given player input
const getChatGPTResponse = async (
  communityCards: Array<Card>,
  gptCards: Array<Card>,
  playerMoney: number,
  pastRounds: Array<Number>,
  chatGPTisBigBlind: boolean,
  opponentBet: number,
  chatGPTCurrentBet: number,
  bigBlindAmount: number,
) => {
  let value = { bet: -1, response: "dummy response" };
  try {
    const response = await axios.post(`${BASE_URL}/chatgpt_response`, {
      money: playerMoney,
      cards: gptCards,
      community: communityCards,
      bet: opponentBet,
      isBigBlind: chatGPTisBigBlind,
      past_rounds: pastRounds,
      chatGPTCurrentBet,
      bigBlindAmount,
    });
    value = response.data;
  } catch (error) {
    console.log("error: ", error);
  }
  // console.log("value: ", value);
  return value;
};

export { pushLeaderboardData, getLeaderboardData, pushGameStartData, getChatGPTResponse, getChatGPTPrompt };
