import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import Post from "@/models/postModel";
import { verifyJWT } from "@/utils/tokenUtils";

connectDB();

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
    try {
        const { postId } = await params; // Await params to access postId
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        const userId = verifyJWT(token);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
        }

        const user = await User.findById(userId);
        const post = await Post.findById(postId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Ensure that bookedPost and bookedBy arrays are initialized
        if (!user.bookedPost) user.bookedPost = [];
        if (!post.bookedBy) post.bookedBy = [];

        // Add the post to the user's bookedPost array and vice versa
        user.bookedPost.push(postId);
        post.bookedBy.push(userId);

        // Save both the user and the post
        await user.save();
        await post.save();

        return NextResponse.json({ msg: "Booked successfully" }, { status: 200 });
    } catch (e: any) {
        console.error(e); // Log the error for debugging
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
