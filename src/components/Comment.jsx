import { useState } from "react";
import API from "../api/axios";

export default function Comment({ comment, currentUser }) {
  const [likes, setLikes] = useState(comment.likes.length);
  const [isLiked, setIsLiked] = useState(
    comment.likes.includes(currentUser._id)
  );

  const handleLike = async () => {
    try {
      await API.put(`/comments/like/${comment._id}`);

      if (isLiked) {
        setLikes((prev) => prev - 1);
      } else {
        setLikes((prev) => prev + 1);
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="border-l-2 border-gray-300 pl-2 py-1">
      <p className="font-semibold">
        {comment.user?.username}
      </p>

      <p>{comment.text}</p>

      <button
        onClick={handleLike}
        className={`text-sm ${
          isLiked ? "text-blue-700 font-semibold" : "text-blue-500"
        }`}
      >
        Like ({likes})
      </button>
    </div>
  );
}
