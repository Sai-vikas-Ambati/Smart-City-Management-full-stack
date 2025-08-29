import React, { useState } from "react";

interface Post {
  id: number;
  user: string;
  content: string;
  media?: string;
  mediaType?: "image" | "video";
  likes: number;
  comments: string[];
}

const SocialWall: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>("");
  const [newMedia, setNewMedia] = useState<string | null>(null);
  const [newMediaType, setNewMediaType] = useState<"image" | "video" | null>(null);
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});

  // Styles object
  const styles = {
    container: {
      padding: "24px",
      backgroundColor: "#f3f4f6",
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    header: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "16px"
    },
    postInputContainer: {
      marginBottom: "24px",
      padding: "16px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
    },
    textarea: {
      width: "100%",
      padding: "8px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      outline: "none",
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
    },
    fileInput: {
      marginTop: "8px",
      width: "100%"
    },
    mediaPreview: {
      marginTop: "8px"
    },
    media: {
      borderRadius: "8px",
      maxHeight: "192px"
    },
    postButton: {
      marginTop: "8px",
      padding: "8px 16px",
      backgroundColor: "#3b82f6",
      color: "white",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    },
    emptyText: {
      color: "#6b7280"
    },
    postsContainer: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "24px"
    },
    postCard: {
      padding: "16px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    },
    postUser: {
      fontSize: "18px",
      fontWeight: "600"
    },
    postContent: {
      color: "#374151"
    },
    actionsContainer: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginTop: "12px"
    },
    likeButton: {
      padding: "4px 12px",
      backgroundColor: "#e5e7eb",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    },
    commentsContainer: {
      marginTop: "12px"
    },
    commentText: {
      color: "#4b5563"
    },
    commentInputContainer: {
      display: "flex",
      gap: "8px",
      marginTop: "8px"
    },
    commentInput: {
      flexGrow: "1",
      padding: "8px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      outline: "none"
    },
    commentButton: {
      padding: "4px 12px",
      backgroundColor: "#3b82f6",
      color: "white",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    }
  };

  // Handle media file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : null;
      if (fileType) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setNewMedia(e.target?.result as string);
          setNewMediaType(fileType);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Handle new post submission
  const handlePostSubmit = () => {
    if (!newPost.trim() && !newMedia) return;
    const newPostData: Post = {
      id: posts.length + 1,
      user: "You", // Placeholder user
      content: newPost,
      media: newMedia || undefined,
      mediaType: newMediaType || undefined,
      likes: 0,
      comments: [],
    };
    setPosts([newPostData, ...posts]);
    setNewPost("");
    setNewMedia(null);
    setNewMediaType(null);
  };

  // Handle like button
  const handleLike = (id: number) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  // Handle new comment submission
  const handleCommentSubmit = (id: number) => {
    if (!newComment[id]?.trim()) return;
    setPosts(posts.map(post =>
      post.id === id ? { ...post, comments: [...post.comments, newComment[id]] } : post
    ));
    setNewComment({ ...newComment, [id]: "" });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📢 Event Social Wall</h2>

      {/* New Post Input */}
      <div style={styles.postInputContainer}>
        <textarea
          style={styles.textarea}
          placeholder="Share something about the event..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <input
          type="file"
          accept="image/*,video/*"
          style={styles.fileInput}
          onChange={handleFileUpload}
        />
        {newMedia && (
          <div style={styles.mediaPreview}>
            {newMediaType === "image" ? (
              <img src={newMedia} alt="Preview" style={styles.media} />
            ) : (
              <video controls style={styles.media}>
                <source src={newMedia} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
        <button
          onClick={handlePostSubmit}
          style={styles.postButton}
        >
          Post
        </button>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <p style={styles.emptyText}>No posts yet. Be the first to share an update!</p>
      ) : (
        <div style={styles.postsContainer}>
          {posts.map((post) => (
            <div key={post.id} style={styles.postCard}>
              <h3 style={styles.postUser}>{post.user}</h3>
              <p style={styles.postContent}>{post.content}</p>

              {post.media && (
                <div style={{ marginTop: "8px" }}>
                  {post.mediaType === "image" ? (
                    <img src={post.media} alt="Post" style={{ ...styles.media, width: "100%" }} />
                  ) : (
                    <video style={{ ...styles.media, width: "100%" }} controls>
                      <source src={post.media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}

              {/* Like & Comment Section */}
              <div style={styles.actionsContainer}>
                <button
                  onClick={() => handleLike(post.id)}
                  style={styles.likeButton}
                >
                  👍 {post.likes}
                </button>
              </div>

              {/* Comments */}
              <div style={styles.commentsContainer}>
                {post.comments.map((comment, index) => (
                  <p key={index} style={styles.commentText}>💬 {comment}</p>
                ))}
                <div style={styles.commentInputContainer}>
                  <input
                    type="text"
                    style={styles.commentInput}
                    placeholder="Write a comment..."
                    value={newComment[post.id] || ""}
                    onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    style={styles.commentButton}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialWall;