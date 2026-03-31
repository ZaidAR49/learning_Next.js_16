import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";
export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const formData = await req.json();
        let event;
        try {
            event = Object.fromEntries(formData);
        }
        catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Failed to create event", error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
        }
        const file = formData.get("image") as File;
        if (!file) {
            return NextResponse.json({ message: "Image is required" }, { status: 400 });
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise((resolve, rejects) => {
            cloudinary.uploader.upload_stream({ resource_type: "image", folder: "events" }, (error, result) => {
                if (error) {
                    rejects(error);
                }
                resolve(result);
            }).end(buffer);

        })
        event.image = (uploadResult as { secure_url: string }).secure_url;

        const createdEvent = await Event.create(event);
        return NextResponse.json({ message: "Event created successfully", event: createdEvent }, { status: 201 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to create event", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const events = await Event.find();
        return NextResponse.json({ message: "Events fetched successfully", events }, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to fetch events", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}