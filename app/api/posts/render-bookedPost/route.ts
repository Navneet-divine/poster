import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import { verifyJWT } from "@/utils/tokenUtils";

// Establish DB connection
connectDB();

export async function GET(req: NextRequest) {
    try {

        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Token not provided" }, { status: 401 });
        }


        const userId = verifyJWT(token);


        const user = await User.findById(userId).populate("bookedPost");


        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }


        return NextResponse.json({ msg: "Booked posts retrieved successfully", posts: user.bookedPost }, { status: 200 });
    } catch (e: any) {

        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
