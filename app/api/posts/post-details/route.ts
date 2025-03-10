import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { verifyJWT } from "@/utils/tokenUtils";

connectDB();

export async function GET(req: NextRequest, { params }: { params: { postId: string | string[] } }) {
    try {
        const { postId } = params;
        console.log(postId);

        if (Array.isArray(postId)) {
            return NextResponse.json({ msg: "Invalid postId." }, { status: 400 });
        }

        const post = await Post.findById(postId);
        console.log(post);

        if (!post) {
            return NextResponse.json({ msg: "post is not found." }, { status: 400 });
        }

        return NextResponse.json(post, { status: 200 });

    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

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

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}