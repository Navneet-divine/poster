import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/lib/db";
import { verifyJWT } from "@/utils/tokenUtils";
import bcrypt from "bcryptjs";

await connectDB();

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        const userId = verifyJWT(token);

        const { oldPassword, newPassword, confirmPassword } = await req.json();
        if (!oldPassword || !newPassword || !confirmPassword) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        if (newPassword !== confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.confirmPassword = await bcrypt.hash(confirmPassword, salt);
        await user.save();

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });

    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}