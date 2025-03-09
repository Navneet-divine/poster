// backend/api/posts/toggle-like/[postId].ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/postModel";
import { verifyJWT } from "@/utils/tokenUtils";

connectDB();

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const { postId } = params;

    // Check if token exists
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ msg: "Authorization token is missing" }, { status: 401 });
    }

    // Verify token & extract user ID
    const userId = await verifyJWT(token); // Ensure verifyJWT is an async function

    // Fetch post from the database
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ msg: "Post not found" }, { status: 404 });
    }

    // Toggle like/unlike for the specific user
    if (!post.likedBy.includes(userId)) {
      post.likedBy.push(userId); // Add the user to the likedBy array
      post.likes++;
      post.isLiked = true; // Update the post's isLiked flag
    } else {
      post.likedBy = post.likedBy.filter((id: any) => id.toString() !== userId); // Remove the user from the likedBy array
      post.likes = Math.max(0, post.likes - 1); // Decrease the like count, ensuring it doesn't go negative
      post.isLiked = false; // Update the post's isLiked flag
    }

    await post.save();

    // Return the updated post with the isLiked status for the current user
    return NextResponse.json({ msg: "Post like status updated", post }, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
