import {z} from "zod";

/**
 * Zod schema representing a boolean that **must always be `false`**.
 */
export const FalseForCrewSchema = z.literal(false, {
    message: "Must be `false` for `CREW` credits.",
});

/**
 * Zod schema representing a value that **must be undefined**.
 */
export const UndefinedForCrewSchema = z.undefined({
    invalid_type_error: "Must be `undefined`.",
    message: "Must be `undefined` for `CREW` credits.",
});