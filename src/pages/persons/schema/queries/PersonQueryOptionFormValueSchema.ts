import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {PersonQueryOptionsSchema} from "@/pages/persons/schema/queries/PersonQueryOption.schema.ts";
import {z} from "zod";

/**
 * **PersonQueryOptionFormValueSchema**
 *
 * Zod schema for validating and preprocessing **form values** used to build
 * a `Person` query.
 *
 * This schema is generated dynamically from {@link PersonQueryOptionsSchema}
 * using {@link generateFormValueSchema}, ensuring consistency between
 * backend query validation and frontend form handling.
 *
 * ### Behavior
 * - Transforms form inputs into properly typed and sanitized values
 *   expected by the query layer.
 * - Handles preprocessing for optional and empty fields.
 * - Retains type compatibility with `PersonQueryOptionsSchema`.
 *
 * ### Example
 * ```ts
 * const values = PersonQueryOptionFormValueSchema.parse({
 *   name: "Alice",
 *   dob: "1992-04-12",
 *   nationality: "GB",
 *   sortByName: "asc"
 * });
 * // => Parsed and validated form values ready for query execution.
 * ```
 */
export const PersonQueryOptionFormValueSchema = generateFormValueSchema(PersonQueryOptionsSchema);

/**
 * **PersonQueryOptionFormValues**
 *
 * Type inferred from {@link PersonQueryOptionFormValueSchema}.
 * Represents the validated structure of all form inputs for querying `Person` documents.
 */
export type PersonQueryOptionFormValues = z.infer<typeof PersonQueryOptionFormValueSchema>;
