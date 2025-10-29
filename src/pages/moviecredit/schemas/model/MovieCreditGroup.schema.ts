import {MovieCreditDetailsExceptPersonSchema} from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";
import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {RoleTypeDepartmentEnumSchema} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";

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
 *       movie: { // populated movie object },
*       roleType: { // populated roleType object },
*       person: "personId123"
*     }
*   ]
* };
*/
export const MovieCreditDetailsExceptPersonByRoleSchema = z.object({
    /**
     * Name of the role (e.g., Director, Actor, Producer).
     * Maximum length of 150 characters.
     */
    roleName: NonEmptyStringSchema.max(150, "Must be 150 characters or less."),

    department: RoleTypeDepartmentEnumSchema,

    /**
     * Array of movie credits for this role.
     * Each item is a {@link MovieCreditDetailsExceptPersonSchema},
     * with `movie` and `roleType` populated, but `person` as ID.
     */
    credits: z.array(MovieCreditDetailsExceptPersonSchema, {
        required_error: "Required.",
        invalid_type_error: "Movie Credits with populated movies and role types required.",
    }),
});

/**
 * Schema representing an array of movie credit groups for a person.
 *
 * @remarks
 * - Each element of the array is a {@link MovieCreditDetailsExceptPersonByRoleSchema}.
 * - Useful when fetching all credits for a person and grouping them by role type.
 *
 * @example
 * const exampleArray = [
 *   {
 *     roleName: "Director",
 *     credits: [// movie credits ]
*   },
*   {
*     roleName: "Actor",
*     credits: [// movie credits ]
    *   }
* ];
*/
export const MovieCreditDetailsExceptPersonByRoleArraySchema = z.array(
    MovieCreditDetailsExceptPersonByRoleSchema,
    {
        required_error: "Required.",
        invalid_type_error: "Must be an array of movie credits for person grouped by role.",
    },
);
