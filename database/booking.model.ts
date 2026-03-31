import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import Event from './event.model';

/**
 * TypeScript interface for the Booking document.
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (email: string) => {
          // RFC 5322 compliant email regex (simplified)
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to verify that the referenced event exists.
 * Throws an error if the event is not found in the database.
 */
BookingSchema.pre('save', async function (next) {
  // Only validate eventId if it's new or modified
  if (this.isModified('eventId')) {
    try {
      const eventExists = await Event.findById(this.eventId);
      if (!eventExists) {
        return new Error('Referenced event does not exist');
      }
    } catch (error) {
      return (
        error instanceof Error ? error : new Error('Error validating event')
      );
    }
  }

});

// Compound unique index on eventId and email to prevent duplicate bookings for the same user per event
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

/**
 * Export the Booking model.
 * Use existing model if available (prevents OverwriteModelError in dev).
 */
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
