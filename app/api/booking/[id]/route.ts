import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/database/booking.model";
import { NextResponse } from "next/server";

interface Props {
    params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: Props) {
    try {
        await connectToDatabase();
        const { id } = await params;
        
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const newBooking = new Booking({
            eventId: id,
            email: email
        });

        await newBooking.save();

        return NextResponse.json({ message: "Booking successful", booking: newBooking }, { status: 201 });
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json({ error: "Failed to book event" }, { status: 500 });
    }
}
