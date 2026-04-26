/** @fileoverview Zod schema and type definitions for paginated detailed theatre data. */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {TheatreDetailsSchema} from "@/domains/theatres/schema/theatre/TheatreDetailsSchema.ts";
import {z} from "zod";

/** Zod schema for a paginated response containing detailed theatre objects. */
export const PaginatedTheatreDetailsSchema = generatePaginationSchema(TheatreDetailsSchema);

/** Type representing a paginated list of detailed theatres inferred from PaginatedTheatreDetailsSchema. */
export type PaginatedTheatreDetails = z.infer<typeof PaginatedTheatreDetailsSchema>;