/**
 * @fileoverview Aggregate schema for the administrative Person detail view.
 * * This schema composes biographical data from the Person domain with
 * professional participation data (stats and filmography) derived from
 * the MovieCredit domain. It serves as the primary data contract for
 * rendering a person's complete profile in the admin dashboard.
 */

import {z} from "zod";
import {PersonSchema} from "@/domains/persons/schema/person/Person.schema.ts";
import {
    PersonCreditStatsSchema,
    PersonFilmographySchema
} from "@/domains/moviecredit/_feat/person-credit";

/**
 * Schema representing the comprehensive data required for a Person's detailed view.
 */
export const PersonDetailsViewSchema = z.object({
    person: PersonSchema,
    stats: PersonCreditStatsSchema,
    filmography: PersonFilmographySchema,
});

/**
 * Validated type for the comprehensive administrative person detail view.
 */
export type PersonDetailsViewData = z.infer<typeof PersonDetailsViewSchema>;