import { useState } from "react";
import API from "../api/axios";
import Comment from "./Comment";

export default function Post({ post }) {
  const userId = localStorage.getItem("userId"); // Or use AuthContext

  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(post.likes?.includes(userId));
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  // Like / Unlike
  const handleLike = async () => {
    try {
      const res = await API.put(`/posts/${post._id}/like`);
      setLikes(res.data.likes.length);
      setLiked(res.data.likes.includes(userId));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // Fetch comments
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
    <div className="border p-4 rounded bg-white shadow-sm mb-4">
      {/* Author */}
      <div className="flex items-center space-x-2 mb-2">
        {post.author?.profilePicture && (
          <img
            src={post.author.profilePicture}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <span className="font-bold">{post.author?.name || post.author?.username || "Anonymous"}</span>
      </div>

      {/* Post Content */}
      {post.text ? (
        <p className="mt-2">{post.text}</p>
      ) : post.media?.length ? (
        <p className="mt-2 text-gray-400 italic">Shared a photo/video</p>
      ) : (
        <p className="mt-2 text-gray-400 italic">No content</p>
      )}

      {/* Media */}
      {post.media?.length > 0 && (
        <div className="mt-3 space-y-2">
          {post.media.map((m, idx) =>
            m.type === "video" ? (
              <video key={idx} controls className="w-full rounded">
                <source src={m.url} type="video/mp4" />
              </video>
            ) : (
              <img key={idx} src={m.url} alt="post media" className="w-full rounded" />
            )
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleLike}
          className={liked ? "text-blue-600 font-semibold" : "text-gray-500"}
        >
          Like ({likes})
        </button>
        <button onClick={fetchComments} className="text-gray-500">
          {showComments ? "Hide" : "View"} Comments
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 space-y-2">
          {comments.length > 0 ? (
            comments.map((c) => <Comment key={c._id} comment={c} />)
          ) : (
            <p className="text-gray-400 text-sm italic">No comments yet</p>
          )}
        </div>
      )}
    </div>
  );
}
