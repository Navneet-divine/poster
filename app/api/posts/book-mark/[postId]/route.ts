import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import Post from "@/models/postModel";
import { verifyJWT } from "@/utils/tokenUtils";

connectDB();

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;
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


        const isAlreadyBooked = user.bookedPost.includes(postId);
        if (isAlreadyBooked) {

            user.bookedPost = user.bookedPost.filter((id: string) => id.toString() !== postId);
            post.bookedBy = post.bookedBy.filter((id: string) => id.toString() !== userId);
            post.isBooked = false
        } else {

            user.bookedPost.push(postId);
            post.bookedBy.push(userId);
            post.isBooked = true
        }

        await user.save();
        await post.save();

        return NextResponse.json({ msg: isAlreadyBooked ? "Booking removed" : "Booked successfully" }, { status: 200 });
    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}