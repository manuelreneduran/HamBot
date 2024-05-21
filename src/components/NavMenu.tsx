import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";

const drawerWidth = 100;
const settings = ["Logout"];

type NavMenuProps = {
  children: React.ReactNode;
  pageHeader?: string;
};
export default function NavMenu({ children }: NavMenuProps) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [user] = useAuthState(auth);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            paddingLeft: "24px",
            minHeight: "36px !important",
            maxHeight: "36px !important",
          }}
        >
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row"
          >
            <Box>
              <Typography>HamBot</Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                marginRight: "24px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{
                      height: "24px",
                      width: "24px",
                    }}
                    alt={user?.displayName || ""}
                    src={user?.photoURL || ""}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ flexShrink: { sm: 0 } }}></Box>
      <Box
        component="main"
        style={{
          padding: "40px 24px",
          maxWidth: "100%",
          paddingBottom: "50px",
          flex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
