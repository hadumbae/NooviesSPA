import { SeatMap, SeatMapDetails } from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import { SeatMapSchema } from "@/pages/seatmap/schema/model/SeatMap.schema.ts";
import { ParseError } from "@/common/errors/ParseError.ts";

/**
 * @function simplifySeatMapDetails
 *
 * @description
 * Converts a populated {@link SeatMapDetails} object into a base
 * {@link SeatMap} model by stripping populated references and
 * restoring ObjectId values.
 *
 * This utility is typically used before:
 * - Form submission
 * - API payload generation
 * - Persisting edited SeatMap data
 *
 * @param seatMap - A fully populated SeatMap details object.
 * @returns A validated {@link SeatMap} object containing only primitive fields and ObjectId references.
 *
 * @throws {ParseError}
 * Thrown when the transformed object fails validation against {@link SeatMapSchema}.
 *
 * @remarks
 * - Extracts `_id` values from populated `seat` and `showing` relations.
 * - Uses Zod schema validation to guarantee structural correctness.
 */
export default function simplifySeatMapDetails(seatMap: SeatMapDetails): SeatMap {
    const {
        seat: { _id: seat },
        showing: { _id: showing },
    } = seatMap;

    const raw = { ...seatMap, seat, showing };
    const { data, success, error } = SeatMapSchema.safeParse(raw);

    if (!success) {
        const { errors } = error;
        throw new ParseError({
            raw,
            errors,
            message: "Failed to simplify seat map details.",
        });
    }

    return data;
}
