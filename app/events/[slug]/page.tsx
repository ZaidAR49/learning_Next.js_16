

import { notFound } from "next/navigation";
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUsers, FaChalkboardTeacher, FaIdBadge } from "react-icons/fa";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const EventDeatailItem = (item: string) => {
        switch (item) {
            case "date":
                return <div className="flex flex-row gap-2">
                    <FaCalendar />
                    <p>{date}</p>
                </div>
            case "time":
                return <div className="flex flex-row gap-2">
                    <FaClock />
                    <p>{time}</p>
                </div>
            case "location":
                return <div className="flex flex-row gap-2">
                    <FaMapMarkerAlt />
                    <p>{location}</p>
                </div>
            case "mode":
                return <div className="flex flex-row gap-2">
                    <FaChalkboardTeacher />
                    <p>{mode}</p>
                </div>
            case "audience":
                return <div className="flex flex-row gap-2">
                    <FaUsers />
                    <p>{audience}</p>
                </div>
            case "organizer":
                return <div className="flex flex-row gap-2">
                    <FaIdBadge />
                    <p>{organizer}</p>
                </div>
            default:
                return null
        }
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`);
    const { event: { title, image, overview, date, time, location, description, mode, audience, agenda, organizer, tags } } = await response.json();
    console.log(agenda);
    if (!title) {
        return notFound();
    }
    return (
        <section>
            <div className="header">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <div className=" deatils">
                <img src={image} alt="event Banner" className="banner" width={800} height={800} />
                <section className="flex flex-col gap-2">
                    <h2>Overview</h2>
                    <p>{overview}</p>
                </section>
                <section className="flex flex-col gap-2">
                    <h2>Event Details</h2>
                    <p>{overview}</p>
                    <div className="flex flex-col gap-2">
                        {EventDeatailItem("date")}
                        {EventDeatailItem("time")}
                        {EventDeatailItem("location")}
                        {EventDeatailItem("mode")}
                        {EventDeatailItem("audience")}
                        {EventDeatailItem("organizer")}
                    </div>
                </section>
                <section className="agenda flex-col gap-2">
                    <h2 className="mb-5">Agenda</h2>
                    <ul>
                        {agenda.map((item: string) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>
                <section className="agenda flex-col gap-2">
                    <h2 className="mb-5">Tags</h2>
                    <ul>
                        {tags.map((item: string) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>
                <aside className="booking">
                    <p className="test-lg font-semibold">Book Event</p>
                </aside>
            </div>
        </section>
    )
}

export default page;
