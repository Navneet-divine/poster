import { connectDB } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"

import jwt from 'jsonwebtoken';


connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(reqBody.password, salt)
        const hashedConfirmPassword = await bcryptjs.hash(reqBody.confirmPassword, salt)

        reqBody.password = hashedPassword
        reqBody.confirmPassword = hashedConfirmPassword


        const registeredUser = await User.findOne({ email: reqBody.email })

        if (registeredUser) {
            throw new Error("user is already registered!")
        }


        if (!reqBody.email) {
            throw new Error("email is required")
        }

        if (reqBody.confirmPassword !== reqBody.password) {
            throw new Error("confirmPassword must be matched!")
        }

        const user = await User.create(reqBody)

        const payload = {
            userId: user._id,
            firstName: user.firstName
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        })

        const response = NextResponse.json({
            msg: "user logged In",
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

