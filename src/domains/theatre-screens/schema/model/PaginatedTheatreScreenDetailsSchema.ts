/**
 * @file Zod validation schema and type definitions for paginated collections of enriched Theatre Screen records.
 * @filename PaginatedTheatreScreenDetailsSchema.ts
 */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {TheatreScreenDetailsSchema} from "@/domains/theatre-screens/schema/model/TheatreScreenDetailsSchema.ts";
import {z} from "zod";

/**
 * Zod schema for a standardized paginated response containing high-detail Theatre Screen records.
 */
export const PaginatedTheatreScreenDetailsSchema = generatePaginationSchema(TheatreScreenDetailsSchema);

/**
 * TypeScript type representing a validated paginated result set of detailed Theatre Screens.
 */
export type PaginatedTheatreScreenDetails = z.infer<typeof PaginatedTheatreScreenDetailsSchema>;