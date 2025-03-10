import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { verifyJWT } from "@/utils/tokenUtils";
import cloudinary from "cloudinary";

connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
    api: { bodyParser: false },
};

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = verifyJWT(token);
        if (!userId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const user = await User.findById(userId);
        const post = await Post.findById(postId).populate("author");

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        if (post.author._id.toString() !== user._id.toString()) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("image") as File | null;

        let imageUrl = post.image;
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

            const result = await cloudinary.v2.uploader.upload(base64String, {
                folder: "poster",
                resource_type: "auto",
            });

            imageUrl = result.secure_url;
        }

        post.image = imageUrl;
        post.caption = formData.get("caption") as string;
        post.location = formData.get("location") as string;

        await post.save();

        return NextResponse.json({ msg: "Post updated successfully" }, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}