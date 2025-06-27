import {z} from "zod";
import {
    PaginatedScreenDetailsSchema,
    PaginatedScreenSchema,
    ScreenArraySchema,
    ScreenDetailsSchema,
    ScreenSchema,
} from "@/pages/screens/schema/screen/Screen.schema.ts";

/**
 * Represents the structure of a single screen object as validated by {@link ScreenSchema}.
 *
 * This type is inferred from the Zod schema and typically includes properties such as
 * screen ID, name, status, and any other metadata defined in the schema.
 */
export type Screen = z.infer<typeof ScreenSchema>;

/**
 * Represents an array of screen objects, as validated by {@link ScreenArraySchema}.
 *
 * This type is used when handling multiple screens at once, such as in paginated API responses
 * or batch operations.
 */
export type ScreenArray = z.infer<typeof ScreenArraySchema>;

/**
 * Represents a more detailed view of a screen object, inferred from {@link ScreenDetailsSchema}.
 *
 * This type may include extended metadata, configuration details, or nested relationships
 * that aren't present in the base {@link Screen} type.
 */
export type ScreenDetails = z.infer<typeof ScreenDetailsSchema>;

/**
 * Represents the TypeScript type inferred from `PaginatedScreenSchema`.
 *
 * This type is used to enforce the structure of paginated basic screen data,
 * including metadata and an array of `Screen` items.
 */
export type PaginatedScreens = z.infer<typeof PaginatedScreenSchema>;

/**
 * Represents the TypeScript type inferred from `PaginatedScreenDetailsSchema`.
 *
 * This type is used to handle paginated detailed screen data,
 * where each screen includes expanded info like theatre, seat count, and showings.
 */
export type PaginatedScreenDetails = z.infer<typeof PaginatedScreenDetailsSchema>;