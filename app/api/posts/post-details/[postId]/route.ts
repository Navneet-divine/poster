import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/postModel";

connectDB()

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params
        console.log(postId)

        const post = await Post.findById(postId).populate("author")
        console.log(post)

        if (!post) {
            return NextResponse.json({ msg: "post is not found." }, { status: 400 })
        }

        return NextResponse.json({post}, { status: 200 })

    } catch (e: any) {
        console.log(e.message)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}