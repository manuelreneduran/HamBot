import { Stack } from "@mui/material";
import React from "react";
import { colors } from "../styles/colors";
import { TEmoji, TMessage } from "../utils/types";
import Emoji from "./Emoji";

type ChatBubbleProps = {
  message: TMessage;
};
const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.sender === "User";

  const emojiReactions: React.ReactNode[] = [];

  for (const key in message.reactions) {
    if (!message.reactions[key as TEmoji]) {
      continue;
    }
    emojiReactions.push(
      <Stack
        key={key}
        sx={{
          fontSize: "12px",
          color: colors.text.tertiary,
          marginRight: "5px",
          backgroundColor: isUser
            ? colors.background.secondary
            : colors.background.primary,
          border: "1px solid white",
          borderRadius: "50%",
        }}
      >
        <Emoji type={key} />
      </Stack>
    );
  }
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
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Stack sx={{ position: "relative" }}>
          <Stack direction="row" sx={{ position: "absolute", bottom: "-25px" }}>
            {emojiReactions}
          </Stack>
        </Stack>
        <Stack
          sx={{
            color: isUser ? colors.text.quaternary : colors.text.secondary,
          }}
          direction="row"
          justifyContent="flex-end"
        >
          {message.createdAt}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChatBubble;
