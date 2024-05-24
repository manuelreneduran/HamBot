import { styled } from "@mui/system";
import { Divider, Stack, Typography } from "@mui/material";
import { colors } from "../styles/colors";

export const MessageListContainer = styled(Stack)({});

export const DateHeader = styled(Divider)({
  paddingX: "2rem",
});

export const DateHeaderText = styled(Typography)({
  fontSize: "12px",
  color: colors.text.tertiary,
  marginX: "1rem",
});
