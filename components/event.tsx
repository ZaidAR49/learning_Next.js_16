"use client";
import { FaCalendar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
interface Props {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}
const Event = ({ title, image, slug, date, location, time }: Props) => {
    return (
        <div className='flex flex-col gap-2 ' id="event-card">
            <img src={image} alt={title} width={410} height={300} className='poster' />
            <h3>{title}</h3>
            <div className="flex flex-row gap-2">
                <p>{slug}</p>
            </div>
            <div className="flex flex-row gap-2">
                <FaCalendar />
                <p>{date}</p>
            </div>
            <div className="flex flex-row gap-2">
                <FaMapMarkerAlt />
                <p>{location}</p>
            </div>
            <div className="flex flex-row gap-2">
                <FaClock />
                <p>{time}</p>
            </div>
        </div>
    )
}

export default Event;