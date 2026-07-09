/**
 * @fileoverview Defines the schema and types for person summary data used in the browse view.
 */

import {z} from "zod";
import {RoleTypeNameSchema} from "@/domains/roletypes";
import {PersonSchema} from "@/domains/persons/_schema";

/** Zod schema for a person summary including their associated role names. */
export const PersonSummaryInfoSchema = PersonSchema.extend({
    roleNames: z.array(RoleTypeNameSchema, {
        required_error: "Required.",
        invalid_type_error: "Must be an array of role names.",
    }),
});

/** Person summary data including associated role names. */
export type PersonSummaryInfo = z.infer<typeof PersonSummaryInfoSchema>;