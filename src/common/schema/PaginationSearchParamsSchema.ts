import {z} from "zod";

export const paginationSearchParamSchema = z.object({
    page: z
        .coerce
        .number({
            required_error: "Required.",
            invalid_type_error: "Must be a number."
        })
        .gte(0, {message: "Page must be 0 or greater."}),

    perPage: z
        .coerce
        .number({
            required_error: "Required.",
            invalid_type_error: "Must be a number."
        })
        .gte(0, {message: "Per Page must be 0 or greater."}),
});

