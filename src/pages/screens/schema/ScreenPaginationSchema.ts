import {z} from "zod";
import {ScreenSchema} from "@/pages/screens/schema/base/ScreenSchema.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";

/**
 * Zod schema for validating a paginated response of screens.
 *
 * This schema defines the structure of paginated screen data received
 * from an API. It includes the total number of items and the list of screens
 * on the current page.
 */
export const PaginatedScreenSchema = generatePaginationSchema(ScreenSchema);

/**
 * Represents the TypeScript type inferred from `PaginatedScreenSchema`.
 *
 * This type is used to enforce the structure of paginated screen data
 * throughout the application.
 */
export type PaginatedScreens = z.infer<typeof PaginatedScreenSchema>;