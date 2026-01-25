import { z } from "zod";
import {
    PaginatedScreenDetailsSchema,
    PaginatedScreenSchema,
    PopulatedScreenSchema,
    ScreenArraySchema,
    ScreenDetailsSchema,
    ScreenSchema,
} from "@/pages/screens/schema/screen/Screen.schema.ts";

/**
 * Type representing a basic screen.
 *
 * Mirrors {@link ScreenSchema}.
 */
export type Screen = z.infer<typeof ScreenSchema>;

/**
 * Type representing a screen with populated theatre data.
 */
export type PopulatedScreen = z.infer<typeof PopulatedScreenSchema>;

/**
 * Type representing a screen with derived details.
 *
 * Includes theatre data, seat count, and future showing count.
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
