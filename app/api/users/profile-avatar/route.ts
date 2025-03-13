import { NextResponse, NextRequest } from "next/server";
import cloudinary from "cloudinary";
import User from "@/models/userModel";
import { verifyJWT } from "@/utils/tokenUtils";
import { connectDB } from "@/lib/db";


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = verifyJWT(token);


        await connectDB()


        const formData = await req.formData();
        const file = formData.get("avatar") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }


        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;


        const result = await cloudinary.v2.uploader.upload(base64String, {
            folder: "poster",
            resource_type: "auto",
        });


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar: result.secure_url },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Image uploaded successfully",

            user: updatedUser
        }, { status: 200 });

    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
