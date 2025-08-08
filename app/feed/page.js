"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch posts from API
    const fetchPosts = async () => {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const { data: session } = useSession();

    const handlePost = async (e) => {
        e.preventDefault();
        if (!session) {
            alert("Log in first to post!");
            return;
        }
        if (!content.trim()) return;
        setLoading(true);
        await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({
                author: session?.user?.name || session?.user?.email || "Anonymous",
                content,
            }),
            headers: { "Content-Type": "application/json" },
        });
        setContent("");
        setLoading(false);
        fetchPosts();
    };

    // Delete post
    const handleDelete = async (id) => {
        await fetch(`/api/posts/${id}`, { method: "DELETE" });
        fetchPosts();
    };

    return (
        <main className="flex flex-col items-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-10">
            <div className="w-full max-w-2xl">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-blue-700 mb-2 text-center drop-shadow">
                        Community Feed
                    </h1>
                    <p className="text-slate-600 text-lg text-center max-w-lg">
                        Share your thoughts, connect with others, and grow your professional
                        network!
                    </p>
                </div>
                <form
                    onSubmit={handlePost}
                    className="bg-gradient-to-br from-blue-100 via-white to-slate-100 border border-blue-200 shadow-lg rounded-2xl p-8 mb-10"
                >
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={session ? "What's on your mind?" : "Log in to post"}
                        rows={3}
                        disabled={!session}
                        className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none mb-4 bg-white/80 text-slate-700 disabled:bg-slate-100 disabled:cursor-not-allowed"
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || !session}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg shadow transition text-lg disabled:bg-blue-300"
                        >
                            {loading ? "Posting..." : "Post"}
                        </button>
                    </div>
                </form>
                <div className="space-y-6">
                    {posts.length === 0 ? (
                        <div className="text-center text-slate-500">No posts available.</div>
                    ) : (
                        posts.map((post) => {
                            const isOwnPost =
                                session &&
                                (post.author === session.user.name ||
                                    post.author === session.user.email);

                            return (
                                <div
                                    key={post._id}
                                    className="bg-white/90 border border-blue-100 shadow-md rounded-xl p-6 transition hover:shadow-xl relative"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-blue-700">{post.author}</span>
                                        <span className="text-xs text-slate-400">
                                            {new Date(
                                                post.createdAt || post.timestamp
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-slate-700 text-lg">{post.content}</p>
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
                        })
                    )}
                </div>
            </div>
        </main>
    );
}