const Emoji = ({ type }: { type: string }) => {
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

  return <span dangerouslySetInnerHTML={{ __html: emoji }} />;
};

export default Emoji;
