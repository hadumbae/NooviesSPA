import { z } from "zod";
import { SeatSchema } from "@/pages/seats/schema/seat/Seat.schema.ts";

/**
 * ## Seat
 *
 * TypeScript type representing a seat in a theatre layout,
 * inferred from {@link SeatSchema}.
 *
 * @remarks
 * This type captures all possible seat properties, including:
 * - Seating details (`seatNumber`, `seatType`, `seatLabel`, `isAvailable`, `priceMultiplier`)
 * - Layout positioning (`row`, `x`, `y`)
 * - Layout classification (`layoutType`: SEAT, AISLE, or STAIR)
 * - References to the associated theatre and screen (`theatre`, `screen`)
 *
 * The `theatre` and `screen` fields may be either:
 * - MongoDB ObjectId strings
 * - Fully populated objects validated by {@link TheatreSchema} and {@link ScreenSchema}
 *
 * @example
 * ```ts
 * const seat: Seat = {
 *   _id: "64f1c0c8ab1234567890abcd",
 *   theatre: "64f1c0c8ab1234567890abce", // or a populated Theatre object
 *   screen: "64f1c0c8ab1234567890abcf",  // or a populated Screen object
 *   row: "A",
 *   seatNumber: 1,
 *   seatType: "VIP",
 *   layoutType: "SEAT",
 *   x: 1,
 *   y: 1,
 *   seatLabel: "VIP-1",
 *   isAvailable: true,
 *   priceMultiplier: 1.5,
 * };
 * ```
 */
export type Seat = z.infer<typeof SeatSchema>;
