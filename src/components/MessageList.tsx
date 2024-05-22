import React from "react";
import { TMessage, TMessageList } from "../utils/types";
import ChatBubble from "./ChatBubble";
import { Divider, Stack, Typography } from "@mui/material";
import { colors } from "../styles/colors";

type MessageListProps = {
  messages?: TMessageList;
};
const MessageList = ({ messages }: MessageListProps) => {
  const buildMessagesChunk = ({
    key,
    messages,
  }: {
    key: string;
    messages: TMessage[];
  }) => {
    // build and set the date header for this message chunk
    const dateHeader = (
      <Divider key={key} sx={{ paddingX: "2rem" }}>
        <Typography
          sx={{
            fontSize: "12px",
            color: colors.text.tertiary,
            marginX: "1rem",
          }}
        >
          {key}
        </Typography>
      </Divider>
    );

    const nodes: React.ReactNode[] = [dateHeader];

    // iterate through messages and build the message nodes
    messages.forEach((message) => {
      nodes.push(<ChatBubble key={message.id} message={message} />);
    });

    return nodes;
  };

  let completeMessageNodes: React.ReactNode[] = [];

  for (const key in messages) {
    const messageChunk = buildMessagesChunk({
      key,
      messages: messages[key],
    });

    completeMessageNodes = [...completeMessageNodes, ...messageChunk];
  }

  return (
    <Stack px={2} pb={4} spacing={3} justifyContent="space-between">
      {completeMessageNodes}
    </Stack>
  );
};

export default MessageList;
