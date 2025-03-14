import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/postModel";

connectDB();

export async function GET({ params }: { params: { postId: string | string[] } }) {
    try {
        const { postId } = params;

        // If postId is an array, return a bad request response
        if (Array.isArray(postId)) {
            return NextResponse.json({ msg: "Invalid postId." }, { status: 400 });
        }

        // Fetch the post from the database using the postId
        const post = await Post.findById(postId);

        // If post not found, return an error message
        if (!post) {
            return NextResponse.json({ msg: "Post not found." }, { status: 404 });
        }

        // Return the post data as JSON
        return NextResponse.json(post, { status: 200 });

    } catch (error: unknown) {
        // Return the error message if an unexpected error occurs
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
