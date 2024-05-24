import {
  AppBar,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import {
  Main,
  StyledAvatar,
  StyledIconButton,
  StyledToolbar,
  ToolbarContent,
  UserMenuContainer,
} from "./NavMenu.styles";
import { useNavigate } from "react-router-dom";
import { EMenuItemSettings, EPaths } from "../utils/types";

const drawerWidth = 100;
const settings: {
  name: EMenuItemSettings;
  route: string;
}[] = [
  {
    name: EMenuItemSettings.LOGOUT,
    route: EPaths.LOGOUT,
  },
];

type NavMenuProps = {
  children: React.ReactNode;
  pageHeader?: string;
};
export default function NavMenu({ children }: NavMenuProps) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Stack sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <StyledToolbar disableGutters>
          <ToolbarContent>
            <Stack>
              <Typography>HamBot</Typography>
            </Stack>

            <UserMenuContainer>
              <Tooltip title="Open settings">
                <StyledIconButton onClick={handleOpenUserMenu}>
                  <StyledAvatar
                    alt={user?.displayName || ""}
                    src={user?.photoURL || ""}
                  />
                </StyledIconButton>
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
                  <MenuItem
                    key={setting.name}
                    onClick={() => navigate(setting.route)}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </UserMenuContainer>
          </ToolbarContent>
        </StyledToolbar>
      </AppBar>
      <Stack component="nav" sx={{ flexShrink: { sm: 0 } }}></Stack>
      <Main>{children}</Main>
    </Stack>
  );
}
