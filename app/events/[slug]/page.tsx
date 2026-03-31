

import { notFound } from "next/navigation";
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUsers, FaChalkboardTeacher, FaIdBadge } from "react-icons/fa";
import BookEvent from "@/components/bookevent";
import { getSimilarEvents } from "@/lib/actions/event.action";
import Event from "@/components/event";
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const similarEvents = await getSimilarEvents(slug);
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
    const { event: { _id, title, image, overview, date, time, location, description, mode, audience, agenda, organizer, tags } } = await response.json();
    console.log(agenda);
    if (!title) {
        return notFound();
    }
    return (
        <div className="flex flex-row ml-10 my-10 gap-20" id="event">
            <section className="flex flex-col flex-1 w-0">
                <div className="header flex flex-col gap-5">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className="details flex flex-col gap-10 mt-10">
                    <img src={image} alt="event Banner" className="banner  object-cover rounded-xl" width={800} height={400} />
                    <section className="flex flex-col gap-4">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>
                    <section className="flex flex-col gap-4">
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
                    <section className="agenda flex flex-col gap-4">
                        <h2 className="mb-2">Agenda</h2>
                        <ul className="pl-5 space-y-2">
                            {agenda.map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>
                    <section className="agenda flex flex-col gap-4">
                        <h2 className="mb-2">Tags</h2>
                        <ul className="flex flex-row flex-wrap gap-2">
                            {tags.map((item: string) => (
                                <li key={item} className="bg-gray-800 px-3 py-1 rounded-full text-sm">{item}</li>
                            ))}
                        </ul>
                    </section>
                    {/* //in the right side */}
                </div>
                <div className="flex w-full flex-col gap-4 pt-20">
                    <h2>Similar Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {similarEvents.length > 0 && similarEvents.slice(0, 3).map((event: any) => (
                            <Event key={event._id.toString()} title={event.title} image={event.image} slug={event.slug} date={event.date} location={event.location} time={event.time} />
                        ))}
                    </div>
                </div>
            </section>

            <aside className="booking shrink-0 w-[350px] border-l-2 border-gray-800 p-5 max-w-3xl px-16">
                <div className="signup-card">
                    <h2> Join the event</h2>
                    <p>Sign up now to secure your spot</p>
                    <BookEvent id={_id.toString()} />
                </div>
            </aside>

        </div>
    )
}

export default page;
