import {z} from "zod";
import {
    PaginatedTheatresWithRecentShowingsSchema,
    TheatreWithRecentShowingsSchema,
} from "@/pages/theatres/schema/model/theatre/TheatreWithRecentShowings.schema.ts";

/**
 * Inferred type for {@link TheatreWithRecentShowingsSchema}.
 */
export type TheatreWithRecentShowings = z.infer<
    typeof TheatreWithRecentShowingsSchema
>;

/**
 * Inferred type for {@link PaginatedTheatresWithRecentShowingsSchema}.
 */
export type PaginatedTheatresWithRecentShowings = z.infer<
    typeof PaginatedTheatresWithRecentShowingsSchema
>;
