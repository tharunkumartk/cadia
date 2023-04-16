import * as React from "react";
import { Button, Dialog, DialogContent, Grid, IconButton, TextField, Typography } from "@mui/material";
import { MetaMaskInpageProvider } from "@metamask/providers";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ethers } from "ethers";
import LeaderboardTable from "../../assets/LeaderboardTable.svg";
import CloseButton from "../../assets/CloseButton.svg";
import { getLeaderboardData } from "../../utils/APIConnection";
import LoadingImage from "../../assets/loading.gif";
import CaptchaImage from "../../assets/captchaimage.png";
import GameBaseButton from "../../assets/Game/GameBaseButton.svg";
import MaskedText from "../MaskedText";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
interface WagerButtonProps {
  text: string;
  onClick: () => void;
}
const SubmitCaptchaButton = ({ text, onClick }: WagerButtonProps) => {
  return (
    <Grid container sx={{ margin: "20px" }}>
      <Button
        onClick={onClick}
        sx={{
          backgroundImage: `url(${GameBaseButton})`,
          backgroundSize: "100% 100%",
          width: "15vw",
          height: "10vh",
          display: "block",
        }}
      >
        <MaskedText text={text} fontSize="1.25rem" />
      </Button>
    </Grid>
  );
};

interface LeaderboardDialogProps {
  open: boolean;
  handleClose: () => void;
  closeCaptcha: () => void;
}

interface LeaderboardData {
  displayName: string;
  score: number;
}

async function connect(proof: Buffer) {
  // Create a provider using MetaMask
  console.log(ethers);
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // Create a signer using the provider
    const signer = provider.getSigner();

    // Create a contract instance
    const contractAddress = "";
    const contractAbi = "";
    const contract = new ethers.Contract(contractAddress, contractAbi, await signer);

    // Call the hello function on the contract
    const result = await contract.hello(proof);
    return result;
  }
  return "MetaMask not found";
}

const getProof = async (wallet_address: string, captcha_text: string) => {
  const proverAPI = "https://urrc4cdvzg.execute-api.us-east-2.amazonaws.com/default/zkaptchaprover";
  return fetch(proverAPI, {
    method: "POST",
    // ex: walletadress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"
    // ex: captcha_text = "z4Tlw1"
    body: JSON.stringify({ pkey: wallet_address, preimage: captcha_text }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      const parsedData = JSON.parse(data);
      const decodedProof = Buffer.from(parsedData.proof, "base64");
      return decodedProof;
    })
    .catch((error) => {
      console.error("Error during POST request:", error);
    });
};

const getCaptcha = async () => {
  const captchaAPI = "https://sx2mbwnkk9.execute-api.us-east-2.amazonaws.com/default/zkaptcha-py";
  try {
    const response = await fetch(captchaAPI);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const resptext = await response.text();
    const b64data = JSON.parse(resptext).png;
    const pngData = b64data.replace(/-/g, "+").replace(/_/g, "/");
    return `data:image/png;base64,${pngData}`;
  } catch (error) {
    console.error("Error fetching captcha:", error);
    return null;
  }
};
interface CaptchaEntryProps {
  entry: string;
  setEntry: React.Dispatch<React.SetStateAction<string>>;
}

const CaptchaEnter = ({ entry, setEntry }: CaptchaEntryProps) => {
  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(${CaptchaImage})`,
        backgroundSize: "100% 100%",
        height: "10vh",
        width: "80%",
        marginTop: "10vh",
      }}
    >
      <Grid item xs={11} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <TextField
          sx={{
            width: "100%",
            justifyItems: "center",
            marginLeft: "20px",
            marginBottom: "25px",
            "& .MuiInputBase-root": {
              color: "primary.main",
            },
          }}
          label="Enter letters"
          InputLabelProps={{
            style: {
              fontFamily: "Joystix",
              fontSize: "100%",
              color: "white",
            },
          }}
          variant="standard"
          value={entry}
          InputProps={{
            style: {
              fontSize: "100%",
              color: "white",
              outline: "none",
              marginBottom: "-15px",
            },
            disableUnderline: false,
          }}
          onChange={(e) => setEntry(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};
const updateResponse = async (setImage: React.Dispatch<React.SetStateAction<string>>) => {
  let updVal = LoadingImage;
  const captchure = await getCaptcha();
  if (captchure) updVal = captchure;
  console.log(updVal);
  setImage(updVal);
};

const submitCaptcha = async (account: string, entry: string) => {
  const proof = await getProof(account, entry);
  console.log(proof);
  if (proof) {
    return connect(proof);
  }
  return false;
};

interface CaptchaDialogProps {
  open: boolean;
  handleClose: () => void;
  closeCaptcha: () => void;
  account: string;
}

const CaptchaDialog = ({ open, handleClose, closeCaptcha, account }: CaptchaDialogProps) => {
  const [captchaImage, setCaptchaImage] = React.useState<string>(LoadingImage);
  const [entry, setEntry] = React.useState<string>("");
  React.useEffect(() => {
    if (captchaImage === LoadingImage) updateResponse(setCaptchaImage);
  }, [captchaImage]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ backgroundColor: "black", width: "100%", height: "100%" }}>
        <Grid
          container
          sx={{
            backgroundImage: `url(${LeaderboardTable})`,
            backgroundSize: "100% 100%",
            height: "80vh",
            width: "30vw",
            display: "flex",
            alignContent: "flex-start",
          }}
        >
          <Grid container sx={{ marginTop: "2vh", justifyContent: "center", alignItems: "center" }}>
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ fontFamily: "Joystix", fontSize: "1.5rem", color: "white" }}>ZKaptcha</Typography>
            </Grid>
            <Grid
              container
              sx={{
                marginTop: "2vh",
                width: "80%",
              }}
            >
              <img
                src={captchaImage}
                alt="captcha"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Grid>
            <CaptchaEnter entry={entry} setEntry={setEntry} />
            <SubmitCaptchaButton text="Submit" onClick={() => submitCaptcha(account, entry)} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CaptchaDialog;
