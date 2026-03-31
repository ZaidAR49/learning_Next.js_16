import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/database/event.model";
import { NextResponse } from "next/server";


interface Props {
    params: Promise<{ slug: string }>
}

export async function GET(request: Request, { params }: Props) {
    try {
        await connectToDatabase();
        const { slug } = await params;
        const formtedSlug = slug.toLocaleLowerCase().trim()
        const event = await Event.findOne({ slug });
        return NextResponse.json({ event });
    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
    }
}