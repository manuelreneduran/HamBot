import React from "react";
import useAlert from "../hooks/useAlert";
import { serializeError } from "../utils/errors";
import { StyledAlert } from "./AlertPopup.styles";

const AlertPopup: React.FC = () => {
  const { text, type, useRawMessage } = useAlert();

  if (text && type) {
    const errorText = serializeError(text, useRawMessage);
    return (
      <StyledAlert severity={type as "error" | "info" | "success" | "warning"}>
        {errorText}
      </StyledAlert>
    );
  } else {
    return null;
  }
};

export default AlertPopup;
