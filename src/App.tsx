import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./config/Router";
import { UserProvider } from "./config/UserContext";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Router />
      </UserProvider>
    </BrowserRouter>
  );
}
