import mongoose from "mongoose";

const { Schema } = mongoose


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,


    },
    lastName: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bgColor: {
        type: String,
        enum: ["red", "green", "purple"]
    },
    password: {
        type: String,
        required: true

    },
    confirmPassword: {
        type: String,
        required: true
    },
})

export default mongoose.models.User || mongoose.model("User", userSchema);