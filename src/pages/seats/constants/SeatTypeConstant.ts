/**
 * ## SeatTypeConstant
 *
 * Provides a complete list of predefined seat categories in a theatre.
 * Each type represents a class of seating that may differ in comfort, location,
 * pricing, accessibility, or special features.
 *
 * ### Seat Types
 * - **REGULAR** — Standard theatre seat.
 * - **PREMIUM** — Enhanced comfort or better location.
 * - **VIP** — Exclusive, high-end seating.
 * - **RECLINER** — Fully or partially reclining seat.
 * - **LOVESEAT** — Two-person seat for couples.
 * - **ACCESSIBLE** — Designed for wheelchair users or mobility-impaired patrons.
 * - **COMPANION** — Adjacent to accessible seats for a companion.
 * - **D-BOX** — Motion-enabled seats for immersive experience.
 * - **HAPTIC** — Seats with vibration feedback for immersion.
 * - **EXTRA-LEGROOM** — Seats with additional leg space.
 * - **BALCONY** — Elevated seating.
 * - **CUDDLE COUCH** — Comfortable sofa-like seating for two or more.
 * - **POD** — Enclosed or semi-enclosed seating pod.
 * - **BOX** — Private or semi-private box seating.
 * - **BEAN BAG** — Casual, flexible seating on the floor.
 * - **FLOOR** — Standard floor seating (general admission).
 * - **BUDGET** — Affordable, no-frills seating.
 * - **STANDING SPACE** — Open area for standing.
 *
 * @remarks
 * - Defined as a `readonly` tuple (`as const`) to infer a strict TypeScript union type.
 * - Commonly used for:
 *   - Form validation
 *   - Type-safe UI assignments
 *   - Integration with schemas and database models
 *
 * @example
 * ```ts
 * import SeatTypeConstant from "@/constant/SeatTypeConstant.ts";
 *
 * type SeatType = typeof SeatTypeConstant[number];
 * // "REGULAR" | "PREMIUM" | "VIP" | ... | "STANDING SPACE"
 *
 * const seat: SeatType = "VIP"; // ✅ Valid
 * const invalidSeat: SeatType = "LOUNGE"; // ❌ Type error
 * ```
 */
export default [
    "REGULAR",
    "PREMIUM",
    "VIP",
    "RECLINER",
    "LOVESEAT",
    "ACCESSIBLE",
    "COMPANION",
    "D-BOX",
    "HAPTIC",
    "EXTRA-LEGROOM",
    "BALCONY",
    "CUDDLE COUCH",
    "POD",
    "BOX",
    "BEAN BAG",
    "FLOOR",
    "BUDGET",
    "STANDING SPACE",
] as const;
