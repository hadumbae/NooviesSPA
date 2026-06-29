/**
 * @fileoverview Defines the schema and type for detailed person information.
 */

import {z} from "zod";
import {PersonSchema} from "@/domains/persons/_schema/person/PersonSchema.ts";

/**
 * Zod schema for validating extended person details.
 * @deprecated This schema is no longer in active use.
 * @note This schema originally contained virtual fields that have since been removed.
 */
export const PersonDetailsSchema = PersonSchema.extend({});

/**
 * Type definition for person details inferred from the schema.
 * @deprecated This type is no longer in active use.
 */
export type PersonDetails = z.infer<typeof PersonDetailsSchema>;