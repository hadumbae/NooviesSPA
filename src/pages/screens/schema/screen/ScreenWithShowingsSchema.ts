import { PopulatedScreenSchema } from "@/pages/screens/schema/screen/Screen.schema.ts";
import { ShowingDetailsArraySchema } from "@/pages/showings/schema/showing/ShowingRelated.schema.ts";
import { z } from "zod";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";

/**
 * @file ScreenWithShowingsSchema.ts
 *
 * Zod schema representing a `Screen` populated with its scheduled showings.
 *
 * Intended for browse and scheduling queries where screens and their
 * associated showings are resolved together.
 */
export const ScreenWithShowingsSchema = PopulatedScreenSchema.extend({
    /**
     * List of showings scheduled on this screen.
     */
    showings: ShowingDetailsArraySchema,
});

/**
 * Array schema for {@link ScreenWithShowingsSchema}.
 */
export const ScreenWithShowingsArraySchema = generateArraySchema(ScreenWithShowingsSchema);

/**
 * Inferred domain type for {@link ScreenWithShowingsSchema}.
 */
export type ScreenWithShowings = z.infer<typeof ScreenWithShowingsSchema>;

/**
 * Inferred domain type for {@link ScreenWithShowingsArraySchema}.
 */
export type ScreenWithShowingsArray = z.infer<typeof ScreenWithShowingsArraySchema>;
