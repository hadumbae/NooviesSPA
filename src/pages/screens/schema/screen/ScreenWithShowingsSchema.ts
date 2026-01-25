import { PopulatedScreenSchema } from "@/pages/screens/schema/screen/Screen.schema.ts";
import { ShowingDetailsArraySchema } from "@/pages/showings/schema/showing/ShowingRelated.schema.ts";
import { z } from "zod";

/**
 * @file ScreenWithShowingsSchema.ts
 *
 * Zod schema for a screen populated with its associated showings.
 *
 * Used in browse and schedule contexts where screens are returned
 * together with a resolved list of showings.
 */
export const ScreenWithShowingsSchema = PopulatedScreenSchema.extend({
    /** Showings scheduled for this screen */
    showings: ShowingDetailsArraySchema,
});

/**
 * Inferred type for {@link ScreenWithShowingsSchema}.
 */
export type ScreenWithShowings = z.infer<typeof ScreenWithShowingsSchema>;
