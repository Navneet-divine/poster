import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
    {
        caption: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        location: {
            type: String,
            required: true,
        },
        likedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        bookedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        isBooked: {
            type: Boolean,
            default: false
        },
        isLiked: {
            type: Boolean,
            default: false,
        },

        likes: {
            type: Number,
            default: 0,
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: "User", // Ensure it references the User model
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
