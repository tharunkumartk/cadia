import * as React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";

import Landing from "../routes/Landing";
import Home from "../routes/Home";
import Game from "../routes/Game";

interface RouteSchema {
  path: string;
  component: JSX.Element;
  isAuthRequired?: boolean;
}

export interface PageProps {
  sound: HTMLAudioElement;
  musicPlaying: boolean;
  setMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  account: string;
  setAccount: (account: string) => void;
}

export default function Router() {
  const songURL = process.env.REACT_APP_IS_DEV
    ? "https://thecadia.xyz/BGMusic.mp3"
    : "http://localhost:3000/BGMusic.mp3";
  const [Sound] = React.useState(new Audio(songURL));
  const [musicPlaying, setMusicPlaying] = React.useState(false);
  const [account, setAccount] = React.useState("");
  const routes: RouteSchema[] = [
    {
      path: "/",
      component: <Landing sound={Sound} musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} />,
    },
    {
      path: "/home",
      component: (
        <Home
          sound={Sound}
          musicPlaying={musicPlaying}
          setMusicPlaying={setMusicPlaying}
          account={account}
          setAccount={setAccount}
        />
      ),
    },
    {
      path: "/game",
      component: (
        <Game
          sound={Sound}
          musicPlaying={musicPlaying}
          setMusicPlaying={setMusicPlaying}
          account={account}
          setAccount={setAccount}
        />
      ),
      isAuthRequired: false,
    },
  ];

  return (
    <Routes>
      {routes.map((route: RouteSchema) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.isAuthRequired === true ? (
              <RequireAuth>{route.component}</RequireAuth>
            ) : (
              <div role="main" className="main-content">
                {route.component}
              </div>
            )
          }
        />
      ))}
    </Routes>
  );
}
