import { z } from "zod";
import { SeatDetailsSchema } from "@/pages/seats/schema/seat/SeatDetails.schema.ts";

/**
 * ## SeatDetails
 *
 * TypeScript type representing a seat with fully populated theatre and screen objects,
 * inferred from {@link SeatDetailsSchema}.
 *
 * @remarks
 * This type extends the basic seat structure with full references to the associated theatre
 * and screen, making it suitable for API responses or detailed UI displays.
 *
 * Key properties include:
 * - `_id` — Unique identifier for the seat
 * - `theatre` — Fully populated theatre object
 * - `screen` — Fully populated screen object
 * - `row`, `x`, `y` — Layout positioning
 * - `layoutType` — Layout classification (`SEAT`, `AISLE`, or `STAIR`)
 * - `seatNumber`, `seatType`, `seatLabel`, `isAvailable`, `priceMultiplier` — Applicable for SEAT type
 *
 * @example
 * ```ts
 * const seatDetails: SeatDetails = {
 *   _id: "64f1c0c8ab1234567890abcd",
 *   theatre: { _id: "64f1c0c8ab1234567890abce", name: "Main Theatre", location: "Downtown" },
 *   screen: { _id: "64f1c0c8ab1234567890abcf", name: "Screen 1", capacity: 120 },
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
export type SeatDetails = z.infer<typeof SeatDetailsSchema>;
