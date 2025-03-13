import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/postModel";

connectDB()

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params


        const post = await Post.findById(postId).populate("author")


        if (!post) {
            return NextResponse.json({ msg: "post is not found." }, { status: 400 })
        }

        return NextResponse.json({ post }, { status: 200 })

    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}