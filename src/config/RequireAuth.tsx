import * as React from "react";
import { useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { getDisplayName } from "../helpers";
import { UserContext } from "./UserContext";
// import { getHolders } from "../utils/APIConnection";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const { currentUser, isLoading } = React.useContext(UserContext);
  const [isHolding, setIsHolding] = React.useState<boolean | undefined>(undefined);
  const [tokensHeld, setTokensHeld] = React.useState<number>(0);

  // all of a type user which we should code in later, just leaving as any for now
  // https://docs.deso.org/deso-backend/api
  const isHolder = (user: any) => {
    const allowedUsers = ["bofanj", "tharuntk", "Hackie_Chen", "crowd34"];
    const MIN_TOKENS_HELD = 10;
    const userDisplayName = getDisplayName(user);
    if (allowedUsers.includes(userDisplayName)) return true;
    return isHolding && tokensHeld >= MIN_TOKENS_HELD;
    // const allowedUsers = [
    //   "Cadia",
    //   "whoami",
    //   "King_Clout",
    //   "netmag",
    //   "leojay",
    //   "dabank",
    //   "LuisEddie",
    //   "CreepyPoe",
    //   "VishalGulia",
    //   "ChocoboWarrior",
    //   "lamDAO",
    //   "Jhayppy",
    //   "BenErsing",
    //   "ElizabethTubbs",
    //   "Rhynelf",
    //   "SeanSlater",
    //   "NodeRunner",
    //   "VindictiveTJ",
    //   "DonBarnhart",
    //   "Mattijs84",
    //   "RyanCharleston",
    //   "ArtBot",
    //   "thesarcasm",
    //   "Johan_Holmberg",
    //   "RomeTrader",
    //   "carterjc",
    //   "Kerningthetruth",
    //   "Tevah",
    //   "RobertGraham",
    //   "CrowdWallet",
    //   "NimalYas",
    //   "Desson",
    //   "MemeGod",
    //   "Sajan",
    //   "Taeo_RestoraFoods",
    //   "PrincetonFund",
    //   "bofanj",
    //   "tharuntk",
    //   "Hackie_Chen",
    // ];
  };

  React.useEffect(() => {
    const getHoldingInfo = async () => {
      if (!currentUser) return;
      const res = await axios.post<any>("https://blockproducer.deso.org/api/v0/is-hodling-public-key", {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        PublicKeyBase58Check: currentUser["PublicKeyBase58Check"],
        IsHodlingPublicKeyBase58Check: "BC1YLjXYN8M8Rdt4bMgP3M124A6byD6xrmBFY3mwqSmz4sVLcnTBNPK",
        IsDAOCoin: true,
      });
      const { data } = res;
      setIsHolding(data.IsHodling);
      let tokens = 0;
      // calculates number of tokens held if user is a holder
      if (data.BalanceEntry !== null) tokens = parseInt(data.BalanceEntry.BalanceNanosUint256 ?? 0, 16) / 1e18;
      setTokensHeld(tokens);
    };

    getHoldingInfo();
  }, [currentUser]);

  // if (isLoading || !holders) return <div>Loading</div>;
  if (isLoading || isHolding === undefined) return <div>Loading</div>;

  if (!currentUser || (currentUser && !isHolder(currentUser))) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  // TODO: styling breaks if we remove main-content, apply that css somewhere else
  return (
    <div role="main" className="main-content">
      {children}
    </div>
  );
}
