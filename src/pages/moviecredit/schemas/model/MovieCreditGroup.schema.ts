import {MovieCreditDetailsExceptPersonSchema} from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";
import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";

/**
 * Schema representing a group of movie credits for a person, organized by role type.
 *
 * @remarks
 * - Each group contains a `roleName` and an array of {@link MovieCreditDetailsExceptPersonSchema}.
 * - Useful for displaying all credits of a person grouped by their role types.
 *
 * @example
 * const example = {
 *   roleName: "Director",
 *   credits: [
 *     {
 *       _id: "abc123",
 *       department: "CREW",
 *       displayRoleName: "Director",
 *       movie: { * populated movie object * },
 *       roleType: { * populated roleType object * },
 *       person: "personId123"
 *     }
 *   ]
 * };
 */
export const MovieCreditDetailsExceptPersonGroupedByRoleSchema = z.object({
    /** Name of the role (e.g., Director, Actor, Producer) */
    roleName: NonEmptyStringSchema.max(150, "Must be 150 characters or less."),
    /** Array of movie credits with populated movie and roleType, but person as ID */
    credits: z.array(MovieCreditDetailsExceptPersonSchema, {
        required_error: "Required.",
        invalid_type_error: "Movie Credits with populated movies and role types required.",
    }),
});
