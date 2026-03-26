import ExploreBtn from "@/components/explore-btn";
import Event from "@/components/event";

export default function Home() {

  const events = [
    {
      title: "Global AI Summit 2026",
      image: "https://www.eventible.com/learning/wp-content/uploads/2024/09/Top-5-IT-Events-from-Q1-Jan-to-Mar-2023.png",
      slug: "global-ai-summit-2026",
      location: "San Francisco, CA",
      date: "2026-05-15",
      time: "09:00 AM"
    },
    {
      title: "TypeScript Deep Dive Workshop",
      image: "https://tse3.mm.bing.net/th/id/OIP.xI3zsQ778NcYgNUhLr1lYgHaE7?w=800&h=533&rs=1&pid=ImgDetMain&o=7&rm=3",
      slug: "typescript-deep-dive",
      location: "Berlin, Germany",
      date: "2026-06-10",
      time: "10:30 AM"
    },
    {
      title: "NextGen Frontend Expo",
      image: "https://tse2.mm.bing.net/th/id/OIP.8eap8TasdROnDY4Oc2GlHAHaEK?w=1120&h=630&rs=1&pid=ImgDetMain&o=7&rm=3",
      slug: "nextgen-frontend-expo",
      location: "London, UK",
      date: "2026-07-22",
      time: "01:00 PM"
    },
    {
      title: "Cloud Native Architecture Day",
      image: "https://tse1.mm.bing.net/th/id/OIP.FXNpr6Y2VdjMLLLny3mq8AHaEo?w=1280&h=800&rs=1&pid=ImgDetMain&o=7&rm=3",
      slug: "cloud-native-architecture",
      location: "Seattle, WA",
      date: "2026-08-05",
      time: "08:45 AM"
    },
    {
      title: "CyberSecurity Defense Forum",
      image: "https://tse4.mm.bing.net/th/id/OIP.DZzmzkP6O1xfQbGqZ0xhcQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      slug: "cybersecurity-defense-forum",
      location: "Tokyo, Japan",
      date: "2026-09-12",
      time: "11:00 AM"
    },

  ];

  return (
    <>
      <section className="text-center mt-20 flex flex-col items-center justify-center gap-5">
        <h1>Find the best tech events<br /> around you</h1>
        <p className="mt-5">Discover and join the most exciting tech events happening near you.</p>
        <ExploreBtn />
      </section>
      <section id="events" className="m-20">
        <h2>Featured Events</h2>
        <ul className="list-none flex flex-row  flex-wrap">
          {events.map((event) => (
            <li key={event.slug} className="flex m-12">
              <Event title={event.title} slug={event.slug} image={event.image} date={event.date} location={event.location} time={event.time} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
