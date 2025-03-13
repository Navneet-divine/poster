import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/postModel";
import { verifyJWT } from "@/utils/tokenUtils";
import cloudinary from "cloudinary";


connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
    api: { bodyParser: false }, // Disable default Next.js body parser
};

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = verifyJWT(token);
        if (!userId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("image") as File | null;

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


        await Post.create({
            image: result.secure_url,
            caption: formData.get("caption") as string,
            location: formData.get("location") as string,
            author: userId

        })


        return NextResponse.json({ msg: "Post created successfully" }, { status: 200 });
    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}