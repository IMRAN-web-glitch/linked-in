import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export async function DELETE(req, { params }) {
  
  await connectDB();
  await Post.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}