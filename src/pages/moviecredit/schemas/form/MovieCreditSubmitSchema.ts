import {z} from "zod";
import {MovieCreditSubmitCrewSchema} from "@/pages/moviecredit/schemas/form/MovieCreditSubmitCrewSchema.ts";
import {MovieCreditFormCastSchema} from "@/pages/moviecredit/schemas/form/MovieCreditSubmitCastSchema.ts";
import {MovieCreditSubmitEmptySchema} from "@/pages/moviecredit/schemas/form/MovieCreditSubmitEmptySchema.ts";

/**
 * Zod discriminated union schema used to represent the various types of movie credit form submissions.
 *
 * @remarks
 * This schema allows the form to dynamically validate one of three possible variants based on the `roleType` discriminator:
 * - `""` → Empty form (used when no roleType is selected yet)
 * - `"CREW"` → Crew-specific form input (requires `job`)
 * - `"CAST"` → Cast-specific form input (requires `characterName` and `billingOrder`)
 *
 * It is intended for general form binding and validation before final submission.
 *
 * @see MovieCreditSubmitSchema — for stricter validation that disallows the empty variant
 */
export const MovieCreditFormSchema = z.discriminatedUnion(
    "roleType",
    [MovieCreditSubmitEmptySchema, MovieCreditSubmitCrewSchema, MovieCreditFormCastSchema],
);

/**
 * Inferred TypeScript type from {@link MovieCreditFormSchema}, representing all possible movie credit form values.
 *
 * @remarks
 * This includes union variants for `CAST`, `CREW`, and the initial unselected (empty) state.
 */
export type MovieCreditFormValues = z.infer<typeof MovieCreditFormSchema>;

/**
 * Refined schema for submitting movie credit data.
 *
 * @remarks
 * This schema builds on {@link MovieCreditFormSchema} but **excludes** the empty state (`roleType: ""`).
 * Used for final form validation before making API requests or mutations.
 *
 * Ensures that the user has selected either `"CAST"` or `"CREW"` as a valid role type.
 */
export const MovieCreditSubmitSchema = MovieCreditFormSchema.refine(
    data => data.roleType !== "",
    {path: ['roleType'], message: "Required."},
);

/**
 * Inferred TypeScript type from {@link MovieCreditSubmitSchema}, representing validated movie credit submissions.
 *
 * @remarks
 * Unlike {@link MovieCreditFormValues}, this type guarantees a non-empty `roleType`.
 */
export type MovieCreditSubmit = z.infer<typeof MovieCreditSubmitSchema>;