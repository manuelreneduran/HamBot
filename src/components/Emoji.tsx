const Emoji = ({
  type,
  useSparkle = false,
}: {
  type: string;
  useSparkle?: boolean;
}) => {
  let emoji = "";

  switch (type) {
    case "like":
      emoji = "👍";
      break;
    case "love":
      emoji = "❤️";
      break;
    case "haha":
      emoji = "😂";
      break;
    case "wow":
      emoji = "😮";
      break;
    case "sad":
      emoji = "😢";
      break;
    case "angry":
      emoji = "😡";
      break;
    default:
      emoji = "";
  }

  return (
    <>
      <div> {emoji}</div>

      {useSparkle && (
        <>
          <div className="sparkle">✨</div>
          <div className="sparkle">✨</div>
          <div className="sparkle">✨</div>
          <div className="sparkle">✨</div>
        </>
      )}
    </>
  );
};

export default Emoji;
