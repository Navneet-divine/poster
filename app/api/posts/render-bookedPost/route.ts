import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import { verifyJWT } from "@/utils/tokenUtils";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Token not provided" }, { status: 401 });
        }

        const userId = verifyJWT(token);

        if (!userId) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }

        const user = await User.findById(userId).populate("bookedPost");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!user.bookedPost || user.bookedPost.length === 0) {
            return NextResponse.json({ msg: "No booked posts found" }, { status: 200 });
        }

        return NextResponse.json(
            { msg: "Booked posts retrieved successfully", posts: user.bookedPost },
            { status: 200 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
