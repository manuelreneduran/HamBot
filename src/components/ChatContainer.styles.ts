import SendIcon from "@mui/icons-material/Send";
import { Avatar, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { colors } from "../styles/colors";

interface SendMessageIconProps {
  isFetchingMessages: boolean;
}

export const ChatContainerWrapper = styled(Stack)({
  border: `1px solid ${colors.border.primary}`,
  height: "100%",
});

export const ChatHeader = styled(Stack)({
  borderBottom: `1px solid ${colors.border.primary}`,
  padding: ".5rem",
});

export const ChatHeaderTitle = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const AvatarBadge = styled(Avatar)({
  height: "32px",
  width: "32px",
});

export const OnlineStatus = styled(Typography)({
  fontSize: "9px",
  color: colors.badge.primary,
});

export const ChatBody = styled(Stack)({
  overflowY: "auto",
  padding: ".5rem",
});

export const ChatFooter = styled(Stack)({
  borderTop: `1px solid ${colors.border.primary}`,
  padding: "1rem",
});

export const SendMessageIcon = styled(SendIcon, {
  shouldForwardProp: (prop) => prop !== "isFetchingMessages",
})<SendMessageIconProps>(({ isFetchingMessages }) => ({
  color: !isFetchingMessages ? colors.background.primary : "disabled",
}));
