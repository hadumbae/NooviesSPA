/**
 * @fileoverview Defines the validation schema and types for the person information view.
 */

import {z} from "zod";
import {PersonSchema} from "@/domains/persons";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {PersonCreditRoleGroupSchema} from "@/domains/movie-credits";

/** Zod schema for validating person details and their grouped filmography credits. */
export const PersonInfoViewDataSchema = z.object({
    person: PersonSchema,
    filmography: generateArraySchema(PersonCreditRoleGroupSchema),
});

/** Type definition for the validated person information view data. */
export type PersonInfoViewData = z.infer<typeof PersonInfoViewDataSchema>;