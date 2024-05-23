import { IconButton, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../styles/colors";
import { TEmoji, TMessage } from "../utils/types";
import Emoji from "./Emoji";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import EmojiList from "./EmojiList";
type ChatBubbleProps = {
  message: TMessage;
  handleEmojiClick: (type: string) => void;
};
const ChatBubble = ({ message, handleEmojiClick }: ChatBubbleProps) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const emojiContainerRef = useRef<HTMLDivElement>(null);

  const toggleEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      emojiContainerRef.current &&
      !emojiContainerRef.current.contains(event.target as Node)
    ) {
      setShowEmojis(false);
    }
  };

  useEffect(() => {
    if (showEmojis) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showEmojis]);

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
        backgroundColor: !isUser
          ? colors.background.secondary
          : colors.background.primary,
        color: !isUser ? colors.text.primary : colors.text.secondary,
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
            color: !isUser ? colors.text.quaternary : colors.text.secondary,
          }}
          direction="row"
          justifyContent="flex-end"
        >
          {message.createdAt}
        </Stack>
      </Stack>
      {!isUser && (
        <Stack>
          <Stack sx={{ position: "relative" }}>
            <Stack
              direction="row"
              sx={{ position: "absolute", top: "2px", right: "-5px" }}
              ref={emojiContainerRef}
            >
              <IconButton
                size="small"
                onClick={toggleEmojis}
                sx={{
                  backgroundColor: colors.background.secondary,
                  "&.MuiButtonBase-root:hover": {
                    backgroundColor: "lightgray",
                  },
                }}
              >
                <AddReactionOutlinedIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                    color: colors.text.primary,
                  }}
                />
              </IconButton>
              {showEmojis && <EmojiList handleEmojiClick={handleEmojiClick} />}
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default ChatBubble;
