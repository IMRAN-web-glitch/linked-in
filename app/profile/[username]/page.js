"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const fetchProfile = async () => {
    const res = await fetch(`/api/profile/${username}`);
    const data = await res.json();
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    if (username) {
      fetchProfile();
    }
    // eslint-disable-next-line
  }, [username]);

  // Delete post handler
  const handleDelete = async (postId) => {
    await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    fetchProfile();
  };

  return (
    <main className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-10">
      <div className="w-full max-w-xl bg-white/90 border border-blue-100 shadow-xl rounded-2xl p-8">
        {loading ? (
          <div className="text-center text-blue-700 font-semibold">Loading...</div>
        ) : user && user.name ? (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-200 via-blue-100 to-slate-200 flex items-center justify-center text-3xl font-bold text-blue-700 mb-3 shadow">
                {user.name[0]?.toUpperCase()}
              </div>
              <h1 className="text-3xl font-extrabold text-blue-700 mb-1">{user.name}</h1>
              {user.email && (
                <p className="text-blue-500 font-medium mb-1">{user.email}</p>
              )}
              <p className="text-slate-600 text-center">{user.bio || "welcome to your profile page"}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-700 mb-3">Posts</h2>
              {user.posts?.length === 0 ? (
                <div className="text-slate-500 text-center">No posts yet.</div>
              ) : (
                <div className="space-y-4">
                  {user.posts.map((post) => {
                    // Only show delete button if logged-in user is the author
                    const isOwnPost =
                      session &&
                      (user.name === session.user.name ||
                        user.name === session.user.email);

                    return (
                      <div
                        key={post._id}
                        className="bg-white border border-blue-100 shadow rounded-xl p-5 relative"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-blue-700 font-semibold">{user.name}</span>
                          <span className="text-xs text-slate-400">
                            {new Date(post.createdAt || post.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-slate-700">{post.content}</p>
                        {isOwnPost && (
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xs font-bold"
                            title="Delete post"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-slate-500">User not found.</div>
        )}
      </div>
    </main>
  );
}