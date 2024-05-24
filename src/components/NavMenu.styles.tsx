import { Avatar, IconButton, Stack, Toolbar } from "@mui/material";
import { styled } from "@mui/system";

export const NavMenuContainer = styled(Stack)({
  display: "flex",
  height: "100%",
});

export const StyledToolbar = styled(Toolbar)({
  paddingLeft: "24px",
  minHeight: "36px !important",
  maxHeight: "36px !important",
});

export const ToolbarContent = styled(Stack)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
});

export const UserMenuContainer = styled(Stack)({
  flexGrow: 0,
  marginRight: "24px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const StyledIconButton = styled(IconButton)({
  padding: 0,
});

export const StyledAvatar = styled(Avatar)({
  height: "24px",
  width: "24px",
});

export const Main = styled(Stack)({
  padding: "40px 24px",
  maxWidth: "100%",
  paddingBottom: "50px",
  flex: 1,
});
