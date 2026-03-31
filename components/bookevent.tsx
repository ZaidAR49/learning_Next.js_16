"use client";
import axios from "axios";
import { getNumberOfBookings } from "@/lib/actions/bookingCount";
import { useState, useEffect } from "react";
const BookEvent = ({ id }: { id: string }) => {
    const [email, setEmail] = useState("");
    const [numberOfBookings, setNumberOfBookings] = useState<number>();
    const [submitting, setSubmitting] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const v = await getNumberOfBookings(id);
                if (typeof v === 'number') {
                    setNumberOfBookings(v);
                } else {
                    console.error("Failed to fetch bookings:", v);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBookings();
    }, [id]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/api/booking/${id}`, {
                email
            });
            // Update the state so the user sees the new booking count
            const v = await getNumberOfBookings(id);
            if (typeof v === 'number') {
                setNumberOfBookings(v);
            }
        }
        catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            setSubmitting(true);
        }, 1000);
    }
    return (
        <div id="book-event">
            {!submitting ?
                <div className="flex flex-col gap-2">

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" className="border-2 border-gray-600 rounded-md" placeholder=" Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
                        <button type="submit" className="button-submit">Book Event</button>
                    </form>
                    <p>Number of bookings: {numberOfBookings}</p>
                </div>
                :
                <p className="text-green-500">Thank you for booking your event</p>
            }
        </div>
    )
}
export default BookEvent;