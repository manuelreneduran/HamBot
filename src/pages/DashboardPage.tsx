import { Stack } from "@mui/material";
import ChatContainer from "../components/ChatContainer";
import CoreLayout from "../layouts/CoreLayout";

const DashboardPage = () => {
  return (
    <CoreLayout>
      <Stack
        sx={{
          height: "100%",
          width: { xs: "100%", sm: "70%", md: "50%" },
          margin: "auto",
        }}
      >
        <ChatContainer />
      </Stack>
    </CoreLayout>
  );
};

export default DashboardPage;
