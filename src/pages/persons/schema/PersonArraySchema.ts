import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import {z} from "zod";

/**
 * Zod schema for validating an array of person objects.
 *
 * Each element must conform to the {@link PersonSchema}.
 * Includes custom error messages for required and type validation.
 */
export const PersonArraySchema = z.array(
    PersonSchema,
    {
        required_error: "Required.",
        invalid_type_error: "Must be an array of persons.",
    }
);

/**
 * TypeScript type representing an array of validated person objects.
 *
 * Inferred from {@link PersonArraySchema}.
 */
export type PersonArray = z.infer<typeof PersonArraySchema>;
