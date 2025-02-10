import { connectDB } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {

        const response = NextResponse.json({
            msg: "user logged out!",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0),
            path: "/"
        });

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

