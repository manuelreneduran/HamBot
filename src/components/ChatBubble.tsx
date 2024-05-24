import React, { useEffect, useRef, useState } from "react";
import {
  ChatBubbleContainer,
  EmojiReactionContainer,
  EmojiListContainer,
  EmojiRow,
  MessageTimeContainer,
  ReactionButtonContainer,
  ReactionButtonRow,
  ReactionIconButton,
  ReactionIcon,
} from "./ChatBubble.styles";
import { TEmoji, TMessage } from "../utils/types";
import Emoji from "./Emoji";
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
      <EmojiReactionContainer key={key}>
        <div key={key} className="emoji">
          <Emoji type={key} />
        </div>
      </EmojiReactionContainer>
    );
  }

  return (
    <ChatBubbleContainer isUser={isUser}>
      {message.content}
      <EmojiListContainer>
        <EmojiRow direction="row">{emojiReactions}</EmojiRow>
      </EmojiListContainer>
      <MessageTimeContainer
        isUser={isUser}
        direction="row"
        justifyContent="flex-end"
      >
        {message.createdAt}
      </MessageTimeContainer>
      {!isUser && (
        <ReactionButtonContainer>
          <ReactionButtonRow direction="row" ref={emojiContainerRef}>
            <ReactionIconButton size="small" onClick={toggleEmojis}>
              <ReactionIcon />
            </ReactionIconButton>
            {showEmojis && (
              <EmojiList
                handleEmojiClick={(type: string) => {
                  toggleEmojis();
                  handleEmojiClick(type);
                }}
              />
            )}
          </ReactionButtonRow>
        </ReactionButtonContainer>
      )}
    </ChatBubbleContainer>
  );
};

export default ChatBubble;
