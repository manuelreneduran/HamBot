import { styled } from "@mui/system";
import { Alert } from "@mui/material";

export const StyledAlert = styled(Alert)({
  position: "absolute",
  top: "1rem",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10000,
});
