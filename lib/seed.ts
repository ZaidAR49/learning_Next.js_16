import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Event from "../database/event.model";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URL;

const seedDatabase = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error(
                "Please define the MONGODB_URL environment variable inside .env.local"
            );
        }

        console.log("🔌 Connecting to Database...");
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected!");

        // OPTIONAL: Uncomment the following lines if you want to wipe existing events before seeding
        // await Event.deleteMany({});
        // console.log("🧹 Cleared existing events");

        const eventsToCreate = [];

        console.log("⚙️ Generating 10 fake events...");

        for (let i = 0; i < 10; i++) {
            const title = faker.company.catchPhrase();
            eventsToCreate.push({
                title: title,
                slug: faker.helpers.slugify(title).toLowerCase() + '-' + faker.string.alphanumeric(4).toLowerCase(),
                description: faker.lorem.paragraphs(2),
                overview: faker.lorem.sentences(2),
                // Fixed deprecated method to use the modern one
                image: faker.image.url({ width: 800, height: 600 }),
                venue: faker.company.name(),
                location: faker.location.city(),
                // Normalizing date to YYYY-MM-DD per your schema requirements
                date: faker.date.future().toISOString().split("T")[0],
                // Normalizing time to HH:MM per your schema validation
                time: "14:30",
                mode: faker.helpers.arrayElement(["In Person", "Online", "Hybrid"]),
                audience: faker.helpers.arrayElement(["Beginners", "Professionals", "All"]),
                agenda: [faker.lorem.sentence(), faker.lorem.sentence()],
                organizer: faker.person.fullName(),
                tags: [faker.word.sample(), "tech", "event"],
            });
        }

        // Insert all events into the database
        await Event.insertMany(eventsToCreate);

        console.log("🎉 Successfully seeded 10 events into MongoDB!");
    } catch (error) {
        console.error("❌ Error seeding the database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("👋 Disconnected from database.");
    }
};

seedDatabase();
