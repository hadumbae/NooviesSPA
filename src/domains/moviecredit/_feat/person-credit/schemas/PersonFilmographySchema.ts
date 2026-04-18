import {z} from "zod";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {PersonCreditRoleGroupSchema} from "@/domains/moviecredit/_feat/person-credit/schemas/PersonCreditRoleGroupSchema.ts";

/**
 * Schema representing an array of role-grouped movie credits.
 */
export const PersonFilmographySchema = generateArraySchema(PersonCreditRoleGroupSchema);
/**
 * Validated type representing the full list of a person's role-grouped filmography.
 */
export type PersonFilmography = z.infer<typeof PersonFilmographySchema>;