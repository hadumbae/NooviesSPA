import {z} from "zod";
import {
    MovieCreditDetailsExceptPersonByRoleArraySchema,
    MovieCreditDetailsExceptPersonByRoleSchema
} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.schema.ts";

/**
 * Type representing a single group of a person's movie credits, organized by role type.
 *
 * @remarks
 * - Each group contains a `roleName` and an array of {@link MovieCreditDetailsExceptPerson}.
 * - Derived from {@link MovieCreditDetailsExceptPersonByRoleSchema}.
 *
 * @example
 * const example: MovieCreditDetailsExceptPersonGroupedByRole = {
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
export type MovieCreditDetailsExceptPersonGroupedByRole = z.infer<
    typeof MovieCreditDetailsExceptPersonByRoleSchema
>;

/**
 * Type representing an array of a person's movie credit groups,
 * each grouped by role type.
 *
 * @remarks
 * - Each element of the array is a {@link MovieCreditDetailsExceptPersonGroupedByRole}.
 * - Derived from {@link MovieCreditDetailsExceptPersonByRoleArraySchema}.
 *
 * @example
 * const exampleArray: MovieCreditDetailsExceptPersonGroupedByRoleArray = [
 *   {
 *     roleName: "Director",
 *     credits: [ // movie credits ]
 *   },
 *   {
 *     roleName: "Actor",
 *     credits: [ // movie credits ]
 *   }
 * ];
 */
export type MovieCreditDetailsExceptPersonGroupedByRoleArray = z.infer<
    typeof MovieCreditDetailsExceptPersonByRoleArraySchema
>;
