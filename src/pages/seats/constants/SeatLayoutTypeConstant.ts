/**
 * ## SeatLayoutTypeConstant
 *
 * Provides the allowed layout classifications for positions within a theatre's seating grid.
 * This constant is used across form schemas, UI rendering logic, and storage models to ensure
 * that each grid cell is assigned a valid layout type.
 *
 * ### Layout Types
 * - **"SEAT"** — A standard seat that can be booked or displayed to users.
 * - **"AISLE"** — A non-seat spacing area that separates blocks of seats.
 * - **"STAIR"** — A vertical or horizontal passage section used for stepping between rows.
 *
 * @remarks
 * Defined as a `readonly` tuple (`as const`) so TypeScript infers a strict union type:
 * `"SEAT" | "AISLE" | "STAIR"`.
 * This improves type-safety for Zod schemas, Mongoose models, UI components,
 * and any domain logic relying on controlled seat layout values.
 *
 * @example
 * ```ts
 * import SeatLayoutTypeConstant from "@/constant/SeatLayoutTypeConstant.ts";
 *
 * type LayoutType = typeof SeatLayoutTypeConstant[number];
 * // "SEAT" | "AISLE" | "STAIR"
 *
 * const layout: LayoutType = "SEAT"; // valid
 * const invalidLayout: LayoutType = "BENCH"; // TypeScript error
 * ```
 */
const SeatLayoutTypeConstant = [
    "SEAT",
    "AISLE",
    "STAIR",
] as const;

export default SeatLayoutTypeConstant;
