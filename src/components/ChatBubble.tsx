import { Stack } from "@mui/material";
import { TMessage } from "../utils/types";
import { colors } from "../styles/colors";

type ChatBubbleProps = {
  message: TMessage;
};
const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.sender === "User";
  return (
    <Stack
      sx={{
        padding: "1rem",
        borderRadius: "10px",
        backgroundColor: isUser
          ? colors.background.secondary
          : colors.background.primary,
        color: isUser ? colors.text.primary : colors.text.secondary,
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "60%",
        wordBreak: "break-word",
      }}
    >
      {message.content}
      <Stack
        sx={{ color: isUser ? colors.text.quaternary : colors.text.secondary }}
        direction="row"
        justifyContent="flex-end"
      >
        {message.createdAt}
      </Stack>
    </Stack>
  );
};

export default ChatBubble;
