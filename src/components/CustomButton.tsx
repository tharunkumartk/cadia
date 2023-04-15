import * as React from "react";
import { Button, Grid } from "@mui/material";
import BaseButton from "../assets/BaseButton.svg";
import MaskedText from "./MaskedText";

interface CustomButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

const CustomButton = ({ text, onClick, disabled = false }: CustomButtonProps) => {
  return (
    <Grid item xs={4} sx={{ margin: "auto" }}>
      <Button
        disabled={disabled}
        onClick={onClick}
        sx={{
          backgroundImage: `url(${BaseButton})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          width: "15vw",
          height: "20vh",
          // temporary disabled styling
          filter: disabled
            ? "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale\")"
            : "none",
        }}
      >
        <MaskedText text={text} fontSize="1.25rem" />
      </Button>
    </Grid>
  );
};

export default CustomButton;
