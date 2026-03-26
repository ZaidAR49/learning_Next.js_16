import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable in .env.local'
  );
}

/**
 * Shape of the cached Mongoose connection stored on the global object.
 * - `conn`    — the resolved Mongoose instance (null until first connect).
 * - `promise` — the in-flight connection promise (null when no connect is pending).
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Extend the Node.js global type so TypeScript knows about our cache property.
 * Using `var` here is intentional — only `var` declarations merge into `globalThis`.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

/**
 * In development, Next.js hot-reloading creates new module instances on every
 * change, which would open a fresh MongoDB connection each time.  Storing the
 * cache on `globalThis` (which persists across module reloads) prevents that.
 *
 * In production the module is loaded once, so this is effectively a module-level
 * singleton — but the pattern is harmless either way.
 */
const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Returns a connected Mongoose instance, reusing the cached connection when
 * available so the application never opens more connections than necessary.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // 1. Happy path — connection is already established.
  if (cached.conn) {
    return cached.conn;
  }

  // 2. No established connection yet — start one (or reuse a pending promise).
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      /**
       * Disable Mongoose's internal command buffer.
       * Without this, operations issued before the connection is ready are
       * silently queued; with it they throw immediately, making issues visible.
       */
      bufferCommands: false,
    });
  }

  // 3. Await the connection, cache the resolved instance, and return it.
  cached.conn = await cached.promise;

  return cached.conn;
}
