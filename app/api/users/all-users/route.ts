import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel"; 

connectDB();

export async function GET(req: NextRequest) {
    try {
        const url = req.nextUrl;
        const page = parseInt(url.searchParams.get('page') || '1', 10); 
        const limit = parseInt(url.searchParams.get('limit') || '6', 10); 

        
        const users = await User.find({})
            .skip((page - 1) * limit)
            .limit(limit);

        const totalUsers = await User.countDocuments();  

        console.log(`Page: ${page}, Limit: ${limit}, Total Users: ${totalUsers}`);

        return NextResponse.json({
            users,
            hasMore: totalUsers > page * limit,
        }, { status: 200 });

    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}