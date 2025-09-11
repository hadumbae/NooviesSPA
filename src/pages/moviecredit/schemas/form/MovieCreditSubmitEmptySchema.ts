import {MovieCreditFormBaseSchema} from "@/pages/moviecredit/schemas/form/MovieCreditSubmitBaseSchema.ts";
import {z} from "zod";


/**
 * A Zod schema representing an "empty" or uninitialized movie credit submission.
 *
 * @remarks
 * This schema is based on `MovieCreditWriteSchema` but overrides and removes
 * certain fields to represent a case where the user has not selected a role type
 * or filled in any role-specific fields.
 *
 * Specifically:
 * - It extends the base schema with a fixed `roleType` literal of an empty string (`""`).
 *
 * This schema can be used for:
 * - Default form states
 * - Validation during role-type selection before specific fields are required
 * - Preventing submission of incomplete role-specific data
 */
export const MovieCreditSubmitEmptySchema = MovieCreditFormBaseSchema.extend({
    roleType: z.literal(""),
});