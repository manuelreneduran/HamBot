import Emoji from "./Emoji";

type EmojiListProps = {
  handleEmojiClick: (type: string) => void;
};

const emojis = ["like", "love", "haha", "wow", "sad", "angry"];

const EmojiList = ({ handleEmojiClick }: EmojiListProps) => {
  return (
    <div className="emoji-list">
      {emojis.map((type) => (
        <span
          onClick={() => handleEmojiClick(type)}
          role="img"
          aria-label={type}
          key={type}
        >
          <Emoji type={type} useSparkle={false} />
        </span>
      ))}
    </div>
  );
};

export default EmojiList;
