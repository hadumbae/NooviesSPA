import {z} from "zod";

/** Schema requiring undefined for crew-restricted fields. */
export const UndefinedForCrewFieldSchema = z.undefined({
    invalid_type_error: "Must be `undefined`.",
    message: "Must be `undefined` for `CREW` credits.",
});