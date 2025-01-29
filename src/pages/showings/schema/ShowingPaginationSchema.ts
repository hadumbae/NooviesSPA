import {z} from "zod";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import {ShowingSchema} from "@/pages/showings/schema/ShowingSchema.ts";

/**
 * Zod schema for validating a paginated response of showings.
 *
 * This schema defines the structure of paginated showing data received
 * from an API. It includes the total number of items and the list of showings
 * on the current page.
 */
export const PaginatedShowingSchema = generatePaginationSchema(ShowingSchema);

/**
 * Represents the TypeScript type inferred from `PaginatedShowingsSchema`.
 *
 * This type is used to enforce the structure of paginated showing data
 * throughout the application.
 */
export type PaginatedShowings = z.infer<typeof PaginatedShowingSchema>;