/**
 * @file simplifySeatDetails.ts
 * @description
 * Utility function that converts a fully populated `SeatDetails` object
 * (including nested theatre and screen objects) into a simplified `Seat`
 * object containing only primitive references.
 *
 * This function:
 * - Extracts `theatre._id` and `screen._id`
 * - Replaces nested objects with their IDs
 * - Validates the resulting shape using `SeatSchema`
 * - Throws a `ParseError` when validation fails
 */

import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import {SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import {ParseError} from "@/common/errors/ParseError.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";

/**
 * Converts a populated `SeatDetails` object into a simplified `Seat` structure.
 *
 * Replaces nested `theatre` and `screen` documents with their respective IDs,
 * then validates the output using Zod.
 *
 * @param seat - A fully populated seat object including theatre and screen info.
 * @returns A simplified, validated `Seat` object.
 * @throws {ParseError} If validation against `SeatSchema` fails.
 *
 * @example
 * ```ts
 * const simplified = simplifySeatDetails(seatDetails);
 * // => { _id, row, number, type, theatre: "abc123", screen: "xyz789" }
 * ```
 */
export default function simplifySeatDetails(seat: SeatDetails): Seat {
    // ⚡ Seat Object ⚡

    const {
        theatre: {_id: theatreID},
        screen: {_id: screenID},
        ...rem
    } = seat;

    const dataObject = {...rem, theatre: theatreID, screen: screenID};

    // ⚡ Parse Seat Object ⚡

    const {success, error, data} = SeatSchema.safeParse(dataObject);

    if (!success) {
        const {errors} = error;

        throw new ParseError({
            errors,
            raw: dataObject,
            message: "Invalid Seat Object. Please try again."
        });
    }

    // ⚡ Return Seat ⚡

    return data;
}
