import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/utils/tokenUtils";
import User from "@/models/userModel";



export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value

        const userId = verifyJWT(token)

        const user = await User.findById(userId)

        return NextResponse.json({ user }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}