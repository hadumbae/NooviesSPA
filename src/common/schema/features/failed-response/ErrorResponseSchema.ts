import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas";

/**
 * 🛑 Standard error response format.
 *
 * Returned whenever an API endpoint fails with a simple error message.
 */
export const ErrorResponseSchema = z.object({
    /** User-friendly error message. */
    message: NonEmptyStringSchema,
});

