import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on("connection", () => {
            console.log("MONGODB CONNECTED")
        })

        connection.on("error", (err) => {
            console.log("MONGODB CONNECTION ERROR!")
        })

    } catch (error) {
        console.log("something went wrong in connecting to  DB!!!")
        console.log(error)
    }
}