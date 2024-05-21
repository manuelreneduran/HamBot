import { Avatar, Badge, Stack, Typography } from "@mui/material";
import hamiltonAvatar from "../assets/hamilton_avatar.jpeg";
import { colors } from "../styles/colors";
import { exampleMessages } from "../utils/examples";
import MessageList from "./MessageList";

const ChatBox = () => {
  return (
    <Stack
      sx={{
        border: `1px solid ${colors.border.primary}`,
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
      <Stack flex={1} sx={{ padding: ".5rem" }} className="chatbox-body">
        <MessageList messages={exampleMessages} />
      </Stack>
      <Stack
        className="chatbox-footer"
        sx={{
          borderTop: `1px solid ${colors.border.primary}`,
          padding: ".5rem",
        }}
      ></Stack>
    </Stack>
  );
};

export default ChatBox;
