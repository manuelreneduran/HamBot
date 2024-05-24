import React from "react";
import { TMessage, TMessageList } from "../utils/types";
import ChatBubble from "./ChatBubble";
import {
  MessageListContainer,
  DateHeader,
  DateHeaderText,
} from "./MessageList.styles";

type MessageListProps = {
  messages?: TMessageList;
  handleAddOrDeleteReaction: (messageId: string, type: string) => void;
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  handleAddOrDeleteReaction,
}) => {
  const buildMessagesChunk = (key: string, messages: TMessage[]) => {
    const dateHeader = (
      <DateHeader key={key}>
        <DateHeaderText>{key}</DateHeaderText>
      </DateHeader>
    );

    const messageNodes = messages.map((message) => (
      <ChatBubble
        handleEmojiClick={(type: string) =>
          handleAddOrDeleteReaction(message.id, type)
        }
        key={message.id}
        message={message}
      />
    ));

    return [dateHeader, ...messageNodes];
  };

  const completeMessageNodes = Object.entries(messages ?? {}).flatMap(
    ([key, messages]) => buildMessagesChunk(key, messages)
  );

  return (
    <MessageListContainer spacing={3} px={2} justifyContent="space-between">
      {completeMessageNodes}
    </MessageListContainer>
  );
};

export default MessageList;
