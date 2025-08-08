import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export async function GET(req, { params }) {
  await connectDB();
//   const {username} = params.username;
  // Find all posts by this author
  const posts = await Post.find({ author: params.username }).sort({ createdAt: -1 });
  // You may want to fetch user details from a User model if you have one
  // For now, just return posts and author
  return Response.json({
    name: params.username,
    email: "", // Add email if you have a User model
    bio: "",   // Add bio if you have a User model
    posts,
  });
}