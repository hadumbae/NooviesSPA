import {MovieCreditFormBaseSchema} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitBaseSchema.ts";
import {z} from "zod";
import unionWithEmptyString from "@/common/utility/schemas/unionWithEmptyString.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";

/**
 * Zod schema for validating form values when submitting a crew role in a movie credit form.
 *
 * @remarks
 * This schema extends the `MovieCreditWriteSchema` by specifying a fixed `roleType` of `"CREW"` and
 * requiring a valid non-empty `job` field. 
 *
 * The `job` field uses a utility schema (`unionWithEmptyString`) that supports temporary empty string values
 * during form input, while disallowing them during actual validation if `disallowEmptyString` is set to `true`.
 * This allows better UX in forms where users may leave the input blank momentarily.
 *
 * @example
 * ```ts
 * const validData = {
 *   roleType: "CREW",
 *   job: "Director",
 *   ... // other fields from MovieCreditWriteSchema
 * };
 * MovieCreditSubmitCrewSchema.parse(validData); // passes
 * ```
 */
export const MovieCreditSubmitCrewSchema = MovieCreditFormBaseSchema.extend({
    roleType: z.literal("CREW"),
    job: unionWithEmptyString({schema: NonEmptyStringSchema, disallowEmptyString: true}),
});

/**
 * Inferred TypeScript type for the crew role form values, based on {@link MovieCreditSubmitCrewSchema}.
 */
export type MovieCreditFormCrewValues = z.infer<typeof MovieCreditSubmitCrewSchema>;