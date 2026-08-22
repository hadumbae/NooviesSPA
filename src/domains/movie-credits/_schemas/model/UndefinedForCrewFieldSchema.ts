import {z} from "zod";
import {preprocessToUndefined} from "@/common/_feat";

/** Schema requiring undefined for crew-restricted fields. */
export const UndefinedForCrewFieldSchema = preprocessToUndefined(
    z.undefined({
        invalid_type_error: "Must be `undefined`.",
        message: "Must be `undefined` for `CREW` credits.",
    }),
);