import { useState } from "react";
import API from "../api/axios";

export default function Comment({ comment }) {
  const [likes, setLikes] = useState(comment.likes.length);

  const handleLike = async () => {
    await API.put(`/comments/like/${comment._id}`);
    setLikes(likes + 1); // simple UI update
  };

  return (
    <div className="border-l-2 border-gray-300 pl-2">
      <p className="font-semibold">{comment.author.name}</p>
      <p>{comment.text}</p>
      <button onClick={handleLike} className="text-sm text-blue-500">Like ({likes})</button>
    </div>
  );
}
