/**
 * @file Zod validation schema and type definitions for paginated collections of Theatre Screen entities.
 * @filename PaginatedTheatreScreenSchema.ts
 */

import {generatePaginationSchema} from "src/common/utility/schemas/generatePaginationSchema.ts";
import {TheatreScreenSchema} from "./TheatreScreenSchema.ts";
import {z} from "zod";

/**
 * Zod schema for a standardized paginated response containing Theatre Screen records.
 */
export const PaginatedTheatreScreenSchema =
    generatePaginationSchema(TheatreScreenSchema);

/**
 * TypeScript type representing a validated paginated result set of Theatre Screens.
 * Inferred directly from {@link PaginatedTheatreScreenSchema}.
 */
export type PaginatedTheatreScreens = z.infer<typeof PaginatedTheatreScreenSchema>;