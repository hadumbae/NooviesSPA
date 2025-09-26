import { z } from "zod";
import {
    PaginatedScreenDetailsSchema,
    PaginatedScreenSchema,
    ScreenArraySchema,
    ScreenDetailsSchema,
    ScreenSchema,
} from "@/pages/screens/schema/screen/Screen.schema.ts";

/**
 * Type representing a basic screen.
 * Mirrors the `ScreenSchema` structure.
 */
export type Screen = z.infer<typeof ScreenSchema>;

/**
 * Type representing a screen with additional details.
 * Includes theatre information, seat count, and future showings.
 */
export type ScreenDetails = z.infer<typeof ScreenDetailsSchema>;

/**
 * Type representing an array of basic screens.
 */
export type ScreenArray = z.infer<typeof ScreenArraySchema>;

/**
 * Type representing a paginated list of basic screens.
 */
export type PaginatedScreens = z.infer<typeof PaginatedScreenSchema>;

/**
 * Type representing a paginated list of detailed screens.
 */
export type PaginatedScreenDetails = z.infer<typeof PaginatedScreenDetailsSchema>;
