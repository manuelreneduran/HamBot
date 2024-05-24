import { styled } from "@mui/system";
import { Stack, IconButton } from "@mui/material";
import { colors } from "../styles/colors";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";

interface MessageTimeContainerProps {
  isUser: boolean;
}

interface ChatBubbleContainerProps {
  isUser: boolean;
}

export const ChatBubbleContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<ChatBubbleContainerProps>(({ isUser }: { isUser: boolean }) => ({
  padding: "1rem",
  borderRadius: "10px",
  backgroundColor: !isUser
    ? colors.background.secondary
    : colors.background.primary,
  color: !isUser ? colors.text.primary : colors.text.secondary,
  alignSelf: isUser ? "flex-end" : "flex-start",
  maxWidth: "60%",
  wordBreak: "break-word",
}));

export const EmojiReactionContainer = styled(Stack)({
  fontSize: "20px",
  color: colors.text.tertiary,
  marginRight: "5px",
  backgroundColor: "transparent",
  borderRadius: "50%",
});

export const EmojiListContainer = styled(Stack)({
  position: "relative",
});

export const EmojiRow = styled(Stack)({
  position: "absolute",
  bottom: "-31px",
});

export const MessageTimeContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<MessageTimeContainerProps>(({ isUser }: { isUser: boolean }) => ({
  color: !isUser ? colors.text.quaternary : colors.text.secondary,
}));

export const ReactionButtonContainer = styled(Stack)({
  position: "relative",
});

export const ReactionButtonRow = styled(Stack)({
  position: "absolute",
  top: "2px",
  right: "-5px",
});

export const ReactionIconButton = styled(IconButton)({
  backgroundColor: colors.background.secondary,
  "&.MuiButtonBase-root:hover": {
    backgroundColor: "lightgray",
  },
});

export const ReactionIcon = styled(AddReactionOutlinedIcon)({
  height: "20px",
  width: "20px",
  color: colors.text.primary,
});
