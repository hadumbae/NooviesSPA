import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";

/**
 * Schema representing the base form values for a seat.
 *
 * All fields use {@link FormStarterValueSchema} to represent their initial form state.
 * Includes common fields like theatre, screen, row, seat type, availability, price multiplier, and y position.
 */
export const SeatFormBaseValuesSchema = z.object({
    theatre: FormStarterValueSchema,
    screen: FormStarterValueSchema,
    row: FormStarterValueSchema,
    seatType: FormStarterValueSchema,
    isAvailable: FormStarterValueSchema,
    priceMultiplier: FormStarterValueSchema,
    y: FormStarterValueSchema,
});

/**
 * Schema representing the full form values for a single seat.
 *
 * Extends {@link SeatFormBaseValuesSchema} by adding seat-specific fields:
 * seat number, seat label, and x position.
 */
export const SeatFormValuesSchema = SeatFormBaseValuesSchema.extend({
    seatNumber: FormStarterValueSchema,
    seatLabel: FormStarterValueSchema,
    x: FormStarterValueSchema,
});

/**
 * Schema representing the form values for a group of seats in a row.
 *
 * Extends {@link SeatFormBaseValuesSchema} by adding the number of seats in the row.
 */
export const SeatsByRowFormValuesSchema = SeatFormBaseValuesSchema.extend({
    numberOfSeats: FormStarterValueSchema,
});