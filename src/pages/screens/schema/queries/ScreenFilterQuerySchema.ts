import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Zod schema for validating screen filter query parameters.
 *
 * This schema is typically used to validate query parameters in a request
 * for filtering screen data. Both fields are optional:
 *
 * - `theatre`: An optional string representing a theatre ID (usually a MongoDB ObjectId string).
 * - `showingsPerScreen`: An optional non-negative number indicating how many showings to include per screen.
 *
 * @example
 * Valid inputs:
 * ```
 * { theatre: "64b7f64e4e1a8e3cce8e7f9d", showingsPerScreen: 3 }
 * { showingsPerScreen: 0 }
 * { }
 * ```
 */
export const ScreenFilterQuerySchema = z.object({
    theatre: IDStringSchema.optional(),
    showingsPerScreen: NonNegativeNumberSchema.optional()
});

/**
 * Inferred TypeScript type representing validated screen filter query parameters.
 */
export type ScreenFilterQuery = z.infer<typeof ScreenFilterQuerySchema>;