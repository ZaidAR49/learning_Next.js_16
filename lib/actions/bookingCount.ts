
"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export async function getNumberOfBookings(eventId?: string) {
    try {
        await connectToDatabase();
        const query = eventId ? { eventId } : {};
        const numberOfBookings = await Booking.countDocuments(query);
        return numberOfBookings;
    }
    catch (error) {
        console.log(error);
        return { error: "Failed to fetch bookings" };
    }
}