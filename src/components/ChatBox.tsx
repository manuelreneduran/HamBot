import { Avatar, Box, Stack } from "@mui/material";
import { colors } from "../styles/colors";
import hamiltonAvatar from "../assets/hamilton_avatar.jpeg";

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
      >
        <Box className="chatbox-header-title">
          <Avatar
            sx={{
              height: "24px",
              width: "24px",
            }}
            alt="Alexander Hamilton"
            src={hamiltonAvatar}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
