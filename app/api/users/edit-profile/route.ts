import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyJWT } from "@/utils/tokenUtils";

await connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { firstName, lastName, email } = reqBody;

        const token = request.cookies.get("token")?.value
        const userId = await verifyJWT(token)

        console.log(userId)


        if (!firstName) {
            return NextResponse.json({ msg: "First name is required" }, { status: 400 });
        }
        if (!lastName) {
            return NextResponse.json({ msg: "Last name is required" }, { status: 400 });
        }
        if (!email) {
            return NextResponse.json({ msg: "Email is required" }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ msg: "Form submitted successfully!" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Something went wrong!" }, { status: 500 });
    }
}
