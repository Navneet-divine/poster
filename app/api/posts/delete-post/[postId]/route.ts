import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { verifyJWT } from "@/utils/tokenUtils";

connectDB()

export async function POST(req: NextRequest, { params }: { params: { postId: string | string[] } }) {
    try {
        const { postId } = params;

        if (Array.isArray(postId)) {
            return NextResponse.json({ msg: "Invalid postId." }, { status: 400 });
        }

        const token = req.cookies.get("token")?.value;
        const userId = verifyJWT(token);

        const post = await Post.findById(postId).populate("author");
        const user = await User.findById(userId);

        if (!post || !user || post.author._id.toString() !== user._id.toString()) {
            return NextResponse.json({ msg: "Unauthorized" }, { status: 403 });
        }

        const deletedPost = await Post.findByIdAndDelete(postId);

        return NextResponse.json({ msg: "Post is deleted", deletedPost }, { status: 200 });

    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}