import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/postModel";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const posts = await Post.find({}).populate("author");

        if (!posts || posts.length === 0) {
            return NextResponse.json({ msg: "Posts are not created yet!" }, { status: 400 });
        }

        return NextResponse.json({ posts }, { status: 200 });

    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}