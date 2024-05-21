import { TMessage } from "../utils/types";

type ChatBubbleProps = {
  message: TMessage;
};
const ChatBubble = ({ message }: ChatBubbleProps) => {
  return <div>{message.content}</div>;
};

export default ChatBubble;
