'use server';

import { connectToDatabase } from "@/lib/mongodb";
import Event from "../../database/event.model";

export const getSimilarEvents = async (slug: string) => {
    try {
        await connectToDatabase();
        const event = await Event.findOne({ slug });
        if (!event) {
            throw new Error('Event not found');
        }
        return await Event.find({ slug: { $ne: slug }, tags: { $in: event.tags } });
    }
    catch (error) {
        return [];
    }
}

export const getAllEvents = async () => {
    try {
        await connectToDatabase();
        const events = await Event.find();
        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error("Failed to fetch all events:", error);
        return [];
    }
}
