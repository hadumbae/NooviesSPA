import {z} from "zod";
import {
    MovieCreditDetailsExceptPersonGroupedByRoleSchema
} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.schema.ts";

/**
 * Type representing a collection of a person's movie credits grouped by role type.
 *
 * @remarks
 * - Each group contains a `roleName` and an array of {@link MovieCreditDetailsExceptPerson}.
 * - Derived from {@link MovieCreditDetailsExceptPersonGroupedByRoleSchema}.
 *
 * @example
 * const example: MovieCreditDetailsExceptPersonGroupedByRole = {
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
export type MovieCreditDetailsExceptPersonGroupedByRole = z.infer<
    typeof MovieCreditDetailsExceptPersonGroupedByRoleSchema
>;
