import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/postModel";

connectDB();

export async function GET() {
    try {
        const posts = await Post.find({}).populate("author");

        if (!posts || posts.length === 0) {
            return NextResponse.json({ msg: "Posts are not created yet!" }, { status: 400 });
        }

        return NextResponse.json({ posts }, { status: 200 });

    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}