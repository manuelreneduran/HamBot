import {
  Badge,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import hamiltonAvatar from "../assets/hamilton_avatar.jpeg";
import useAlert from "../hooks/useAlert";
import {
  useCreateEmbeddingMutation,
  useCreateMessageMutation,
  useCreateOrDeleteReactionMutation,
  useGetMessagesQuery,
} from "../services/api";
import { auth } from "../services/firebase";
import { colors } from "../styles/colors";
import {
  AvatarBadge,
  ChatBody,
  ChatContainerWrapper,
  ChatFooter,
  ChatHeader,
  ChatHeaderTitle,
  OnlineStatus,
  SendMessageIcon,
} from "./ChatContainer.styles";
import MessageList from "./MessageList";

const ChatContainer = () => {
  const [userInput, setUserInput] = useState<string>("");

  const [isFetchingMessages, setIsFetchingMessages] = useState<boolean>(false);

  const [user] = useAuthState(auth);

  const { data: messages, error } = useGetMessagesQuery(user?.uid as string, {
    pollingInterval: 2500,
    skip: !user?.uid,
  });

  const [createEmbedding] = useCreateEmbeddingMutation();

  const [createMessage] = useCreateMessageMutation();

  const [createOrDeleteReaction] = useCreateOrDeleteReactionMutation();

  const { setAlert } = useAlert();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (error) {
      setAlert("Error fetching chat. Please try again later.", "error", true);
    }
  }, [error, setAlert]);

  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetchingMessages(true);
    if (!userInput || !user?.uid) {
      return;
    }

    try {
      const response = await createMessage({
        userId: user.uid,
        text: userInput,
      });
      setUserInput("");
      if (response.data) {
        await createEmbedding({ userId: user.uid, messageId: response.data });
      }
    } catch (error) {
      setAlert("Error sending message. Please try again later.", "error", true);
    } finally {
      setIsFetchingMessages(false);
    }
  };

  const handleAddOrDeleteReaction = async (messageId: string, type: string) => {
    setIsFetchingMessages(true);
    try {
      await createOrDeleteReaction({ messageId, type });
    } catch (error) {
      setAlert("Error adding reaction. Please try again later.", "error", true);
    } finally {
      setIsFetchingMessages(false);
    }
  };

  return (
    <ChatContainerWrapper className="chatcontainer-container">
      <ChatHeader
        direction="row"
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        className="chatcontainer-header"
      >
        <ChatHeaderTitle className="chatcontainer-header-title">
          <Badge
            color="success"
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            overlap="circular"
          >
            <AvatarBadge alt="Alexander Hamilton" src={hamiltonAvatar} />
          </Badge>
          <Stack ml={1}>
            <Typography>Alexander Hamilton</Typography>
            <OnlineStatus>Online</OnlineStatus>
          </Stack>
        </ChatHeaderTitle>
      </ChatHeader>
      <ChatBody
        ref={containerRef}
        height={"100%"}
        className="chatcontainer-body"
      >
        <MessageList
          handleAddOrDeleteReaction={handleAddOrDeleteReaction}
          messages={messages}
        />
      </ChatBody>
      <ChatFooter className="chatcontainer-footer">
        <form onSubmit={handleSubmitMessage}>
          <TextField
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            disabled={isFetchingMessages}
            InputProps={{
              style: {
                borderRadius: "40px",
                backgroundColor: colors.background.secondary,
              },
              endAdornment: (
                <InputAdornment position="end" sx={{ marginRight: "10px" }}>
                  <IconButton
                    aria-label="send message"
                    edge="end"
                    type="submit"
                    disabled={isFetchingMessages}
                  >
                    <SendMessageIcon isFetchingMessages={isFetchingMessages} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
            autoFocus
            label="Type a message"
            fullWidth
          />
        </form>
      </ChatFooter>
    </ChatContainerWrapper>
  );
};

export default ChatContainer;
