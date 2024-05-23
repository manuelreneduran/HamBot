import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Badge,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import hamiltonAvatar from "../assets/hamilton_avatar.jpeg";
import useAlert from "../hooks/useAlert";
import {
  useCreateEmbeddingMutation,
  useCreateMessageMutation,
  useCreateOrDeleteReactionMutation,
  useGetMessagesQuery,
} from "../services/api";
import { colors } from "../styles/colors";
import MessageList from "./MessageList";
import TypingLoader from "./TypingLoader";

const ChatContainer = () => {
  const [userInput, setUserInput] = useState<string>("");
  // we put the loading state in the component to avoid
  // showing dot loader every polling interval
  const [isFetchingMessages, setIsFetchingMessages] = useState<boolean>(false);

  const { data: messages, error } = useGetMessagesQuery("1", {
    pollingInterval: 5000,
  });

  const [createEmbedding, { isLoading: isLoadingCreateEmbedding }] =
    useCreateEmbeddingMutation();

  const [createMessage, { isLoading: isLoadingCreateMessage }] =
    useCreateMessageMutation();

  const [
    createOrDeleteReaction,
    { isLoading: isLoadingCreateOrDeleteReaction },
  ] = useCreateOrDeleteReactionMutation();

  const { setAlert } = useAlert();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]); // Dependency on children to re-scroll when new content is added

  useEffect(() => {
    if (error) {
      setAlert("Error fetching chat. Please try again later.", "error", true);
    }
  }, [error, setAlert]);

  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput) {
      return;
    }
    setIsFetchingMessages(true);
    try {
      await createMessage({ userId: "1", text: userInput });
      await createEmbedding({ userId: "1", userInput });
    } catch (error) {
      setAlert("Error sending message. Please try again later.", "error", true);
    } finally {
      setUserInput("");
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

  const isFetching =
    isFetchingMessages ||
    isLoadingCreateEmbedding ||
    isLoadingCreateMessage ||
    isLoadingCreateOrDeleteReaction;
  return (
    <Stack
      sx={{
        border: `1px solid ${colors.border.primary}`,
        height: "100%",
      }}
      className="chatcontainer-container"
    >
      <Stack
        direction="row"
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        className="chatcontainer-header"
        sx={{
          borderBottom: `1px solid ${colors.border.primary}`,
          padding: ".5rem",
        }}
      >
        <Stack
          className="chatcontainer-header-title"
          display="flex"
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Badge
            color="success"
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            overlap="circular"
          >
            <Avatar
              sx={{
                height: "32px",
                width: "32px",
              }}
              alt="Alexander Hamilton"
              src={hamiltonAvatar}
            />
          </Badge>
          <Stack>
            <Typography>Alexander Hamilton</Typography>
            <Typography fontSize="9px" sx={{ color: colors.badge.primary }}>
              Online
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        ref={containerRef}
        height={"100%"}
        sx={{
          overflowY: "auto",
          padding: ".5rem",
        }}
        className="chatcontainer-body"
      >
        <MessageList
          handleAddOrDeleteReaction={handleAddOrDeleteReaction}
          messages={messages}
        />
        <Stack height="100%" alignItems="flex-start" flex={1} mb={2}>
          {isFetching && <TypingLoader />}
        </Stack>
      </Stack>
      <Stack
        className="chatcontainer-footer"
        sx={{
          borderTop: `1px solid ${colors.border.primary}`,
          padding: "1rem",
        }}
      >
        <form onSubmit={handleSubmitMessage}>
          <TextField
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            disabled={isFetching}
            InputProps={{
              style: {
                borderRadius: "40px",
                backgroundColor: colors.background.secondary,
              },
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    marginRight: "10px",
                  }}
                >
                  <IconButton
                    aria-label="send message"
                    edge="end"
                    type="submit"
                    disabled={isFetching}
                  >
                    <SendIcon
                      sx={{
                        color: !isFetching
                          ? colors.background.primary
                          : "disabled",
                      }}
                    />
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
      </Stack>
    </Stack>
  );
};

export default ChatContainer;
