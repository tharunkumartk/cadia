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

const routes: RouteSchema[] = [
  { path: "/", component: <Landing /> },
  { path: "/home", component: <Home /> },
  { path: "/game", component: <Game />, isAuthRequired: true },
];

export default function Router() {
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
