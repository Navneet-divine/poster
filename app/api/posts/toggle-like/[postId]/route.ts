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


    if (!post.likedBy.includes(userId)) {
      post.likedBy.push(userId);
      post.likes++;
      post.isLiked = true;
    } else {

      post.likedBy = post.likedBy.filter((id: string) => id.toString() !== userId.toString());
      post.likes = Math.max(0, post.likes - 1);
      post.isLiked = false;
    }

    await post.save();


    return NextResponse.json({ msg: "Post like status updated", post }, { status: 200 });
  } catch (error: unknown) {

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
