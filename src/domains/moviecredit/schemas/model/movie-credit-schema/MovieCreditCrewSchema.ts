/**
 * @file Utility schemas enforcing crew-specific field constraints.
 * @filename MovieCreditCrewSchema.ts
 */

import {z} from "zod";

/** Literal schema requiring a false value for crew-specific flags. */
export const FalseForCrewSchema = z.literal(false, {
    message: "Must be `false` for `CREW` credits.",
});

/** Schema requiring undefined for crew-restricted fields. */
export const UndefinedForCrewSchema = z.undefined({
    invalid_type_error: "Must be `undefined`.",
    message: "Must be `undefined` for `CREW` credits.",
});