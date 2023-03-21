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

  const [holders, setHolders] = React.useState<any>(undefined);

  // all of a type user which we should code in later, just leaving as any for now
  // https://docs.deso.org/deso-backend/api
  const isHolder = (user: any) => {
    const allowedUsers = ["bofanj", "tharuntk", "Hackie_Chen"];
    const userDisplayName = getDisplayName(user);
    if (allowedUsers.includes(userDisplayName)) return true;
    return holders.some((holder: any) => userDisplayName === getDisplayName(holder));
  };

  // const convertNanoToCoin = (nano: number) => {
  //   const DESO_PRICE = 10;
  //   const CADIA_PRICE = 1.94;
  //   const desoAmount = nano / 1e9;
  //   const investedMoney = desoAmount * DESO_PRICE;
  //   const tokensOwned = investedMoney / CADIA_PRICE;
  //   return tokensOwned;
  // };

  React.useEffect(() => {
    const getHolders = async () => {
      const res = await axios.get<any>("https://openfund.com/api/v0/top-dao-holders/Cadia", {
        params: {
          sort_type: "wealth",
          purchased_only: true,
          limit: 1000000,
        },
      });
      const { data } = res;
      setHolders(data?.Hodlers);
    };

    getHolders();
  }, []);

  if (isLoading || !holders) return <div>Loading</div>;

  if (!currentUser || (currentUser && !isHolder(currentUser))) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  // TODO: styling breaks if we remove main-content, apply that css somewhere else
  return (
    <div role="main" className="main-content">
      {children}
    </div>
  );
}
