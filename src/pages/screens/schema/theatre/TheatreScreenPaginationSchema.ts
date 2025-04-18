import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import {TheatreScreenSchema} from "@/pages/screens/schema/theatre/TheatreScreenSchema.ts";
import {z} from "zod";

/**
 * Zod schema for validating a paginated response of theatre screens.
 *
 * This schema defines the structure of paginated screen data received
 * from an API. It includes the total number of items and the list of screens
 * on the current page.
 */
export const PaginatedTheatreScreenSchema = generatePaginationSchema(TheatreScreenSchema);

/**
 * Represents the TypeScript type inferred from `PaginatedScreenSchema`.
 *
 * This type is used to enforce the structure of paginated screen data
 * throughout the application.
 */
export type PaginatedTheatreScreens = z.infer<typeof PaginatedTheatreScreenSchema>;