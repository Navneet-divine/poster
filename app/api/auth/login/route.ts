import { connectDB } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import { signJwt } from "@/utils/tokenUtils";



connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const user = await User.findOne({ email: reqBody.email })

        if (!user) {
            return NextResponse.json({ msg: "user does not exists" }, { status: 400 })
        }

        const isMatched = await bcryptjs.compare(reqBody.password, user.password)

        if (!isMatched) {
            return NextResponse.json({ msg: "Password is wrong" }, { status: 400 })
        }

        const payload = {
            userId: user._id,
            firstName: user.firstName
        }

        const token = signJwt(payload)

        const response = NextResponse.json({
            message: "logged in Success",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })

        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

