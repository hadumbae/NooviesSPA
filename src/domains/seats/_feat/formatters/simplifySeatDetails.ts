/**
 * @fileoverview Utility function to convert a fully populated seat details object into a simplified seat object.
 */

import {Seat, SeatDetails, SeatSchema} from "src/domains/seats/schema/model";
import {ParseError} from "src/common/errors/ParseError.ts";

/** Converts a fully populated seat details object into a simplified seat object. */
export function simplifySeatDetails(seat: Seat | SeatDetails): Seat {
    const {theatre, screen, ...rem} = seat;

    const dataObject = {
        ...rem,
        theatre: typeof theatre === "string" ? theatre : theatre._id,
        screen: typeof screen === "string" ? screen : screen._id
    };

    const {success, error, data} = SeatSchema.safeParse(dataObject);

    if (!success) {
        const {errors} = error;

        throw new ParseError({
            errors,
            raw: dataObject,
            message: "Invalid Seat Object. Please try again.",
        });
    }

    return data;
}