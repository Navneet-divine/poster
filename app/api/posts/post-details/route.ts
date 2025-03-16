import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/postModel";

connectDB();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ postId: string }> }
) {
    try {
        const { postId } = await params;

        if (!postId) {
            return NextResponse.json({ msg: "Invalid postId." }, { status: 400 });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return NextResponse.json({ msg: "Post not found." }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}