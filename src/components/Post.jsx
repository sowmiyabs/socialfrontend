import { useState } from "react";
import API from "../api/axios";
import Comment from "./Comment";

export default function Post({ post }) {
  const userId = localStorage.getItem("userId"); // or get from AuthContext
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  console.log("Author:", post.author);



  const handleLike = async () => {
    try {
      const res = await API.put(`/posts/${post._id}/like`);
      setLikes(res.data.likes.length);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const fetchComments = async () => {
    if (!showComments) {
      try {
        const res = await API.get(`/comments/post/${post._id}`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    }
    setShowComments(!showComments);
  };

  return (
    <div className="border p-4 rounded bg-white shadow-sm">
     <h3 className="font-bold">{post.author?.name || "Anonymous"}</h3>

      <p className="mt-2">{post.content}</p>
      <div className="flex space-x-4 mt-2">
        <button onClick={handleLike} className="text-blue-500">
          Like ({likes})
        </button>
        <button onClick={fetchComments} className="text-gray-500">
          {showComments ? "Hide" : "View"} Comments
        </button>
      </div>
      {showComments && (
        <div className="mt-2 space-y-2">
          {comments.length ? (
            comments.map((c) => <Comment key={c._id} comment={c} />)
          ) : (
            <p className="text-gray-400 text-sm">No comments yet</p>
          )}
        </div>
      )}
    </div>

  );
}
const handleLike = async () => {
  try {
    await API.put(`/posts/like/${post._id}`);
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  } catch (error) {
    console.error(error);
  }
};


