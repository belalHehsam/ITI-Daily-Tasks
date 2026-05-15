import { useState } from "react";
export default function Button() {
  let [likes, setLikes] = useState(0);
  let [dislikes, setDislikes] = useState(0);

  const handleLikes = () => {
    setLikes(likes + 1);
  };
  const handleDisLikes = () => {
    setDislikes(dislikes + 1);
  };
  return (
    <>
      <button className="news-card__btn" onClick={handleLikes}>
        👍 <span>{likes}</span>
      </button>
      <button className="news-card__btn" onClick={handleDisLikes}>
        👎 <span>{dislikes}</span>
      </button>
    </>
  );
}
