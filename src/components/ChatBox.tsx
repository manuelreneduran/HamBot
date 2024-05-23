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
  useGetMessagesQuery,
} from "../services/api";
import { colors } from "../styles/colors";
import MessageList from "./MessageList";
import TypingLoader from "./TypingLoader";

const ChatBox = () => {
  const [userInput, setUserInput] = useState<string>("");

  const {
    data: messages,
    error,
    isFetching: isFetchingMessages,
  } = useGetMessagesQuery("1");

  const [createEmbedding, { isLoading: isLoadingCreateEmbedding }] =
    useCreateEmbeddingMutation();

  const [createMessage, { isLoading: isLoadingCreateMessage }] =
    useCreateMessageMutation();

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
    try {
      await createMessage({ userId: "1", text: userInput });
      await createEmbedding({ userId: "1", userInput });
    } catch (error) {
      setAlert("Error sending message. Please try again later.", "error", true);
    } finally {
      setUserInput("");
    }
  };

  const handleAddReaction = (type: string) => {
    console.log(type);
  };

  const isFetching =
    isFetchingMessages || isLoadingCreateEmbedding || isLoadingCreateMessage;
  return (
    <Stack
      sx={{
        border: `1px solid ${colors.border.primary}`,
        height: "100%",
      }}
      className="chatbox-container"
    >
      <Stack
        direction="row"
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        className="chatbox-header"
        sx={{
          borderBottom: `1px solid ${colors.border.primary}`,
          padding: ".5rem",
        }}
      >
        <Stack
          className="chatbox-header-title"
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
        className="chatbox-body"
      >
        <MessageList handleEmojiClick={handleAddReaction} messages={messages} />
        <Stack height="100%" alignItems="flex-start" flex={1} mb={2}>
          {isFetching && <TypingLoader />}
        </Stack>
      </Stack>
      <Stack
        className="chatbox-footer"
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

export default ChatBox;
