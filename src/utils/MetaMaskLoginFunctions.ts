import React from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export const requestLogin = (setAccount: (account: string) => void) => {
  if (window.ethereum && window.ethereum.isMetaMask) {
    window.ethereum.request({ method: "eth_requestAccounts" }).then((res: any) => {
      // Return the address of the wallet
      setAccount(res[0]);
    });
  } else {
    alert("install metamask extension!!");
  }
};

export const requestLogout = (setAccount: (account: string) => void) => {
  if (window.ethereum && window.ethereum.isMetaMask) {
    window.ethereum.request({ method: "eth_logout" }).then(() => {
      setAccount("");
    });
  } else {
    alert("install metamask extension!!");
  }
};
