import {z} from "zod";
import {ISO3166Alpha2CodeEnum} from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {UndefinedStringSchema} from "@/common/schema/strings/UndefinedStringSchema.ts";

/**
 * Schema defining the query parameters used to filter or search for a person.
 *
 * @property _id - Optional string representing the unique identifier of the person.
 *                 Validated by {@link IDStringSchema}.
 * @property name - Optional trimmed string for the person's name.
 *                  Empty or whitespace-only strings are transformed to `undefined`.
 *                  Validated by {@link UndefinedStringSchema}.
 * @property nationality - Optional ISO 3166-1 alpha-2 country code representing the person's nationality.
 *                         Validated by {@link ISO3166Alpha2CodeEnum}.
 *
 * @remarks
 * This schema is typically used for parsing and validating URL query parameters
 * related to person filtering or search operations.
 *
 * @example
 * ```ts
 * const query = PersonFilterQuerySchema.parse({
 *   _id: "507f1f77bcf86cd799439011",
 *   name: "Alice",
 *   nationality: "US",
 * });
 * ```
 */
export const PersonFilterQuerySchema = z.object({
    _id: IDStringSchema.optional(),
    name: UndefinedStringSchema,
    nationality: ISO3166Alpha2CodeEnum.optional(),
});

/**
 * Type inferred from {@link PersonFilterQuerySchema}, representing validated query parameters for person-related queries.
 */
export type PersonFilterQuery = z.infer<typeof PersonFilterQuerySchema>;