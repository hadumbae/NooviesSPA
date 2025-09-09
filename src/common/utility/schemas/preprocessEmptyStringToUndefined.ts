import {z, ZodTypeAny} from "zod";

/**
 * Wraps a Zod schema to preprocess empty string values (`""`) as `undefined`.
 *
 * This is useful for forms or query parameters where an empty input should be treated
 * as “no value” rather than a literal empty string. The resulting schema is also marked as `.optional()`.
 *
 * @template TSchema - The type of the Zod schema being wrapped.
 * @param {TSchema} schema - The original Zod schema to apply after preprocessing.
 * @returns {z.ZodOptional<z.ZodEffects<TSchema, any, any>>} A schema that treats empty strings as `undefined` and applies the original schema.
 *
 * @example
 * ```ts
 * const RoleNameSchema = preprocessEmptyStringToUndefined(z.string().max(150));
 * // "" => undefined
 * // "Admin" => "Admin"
 *
 * const DepartmentSchema = preprocessEmptyStringToUndefined(RoleTypeDepartmentEnumSchema);
 * ```
 */
export default function preprocessEmptyStringToUndefined<TSchema extends ZodTypeAny = ZodTypeAny>(schema: TSchema) {
    return z.preprocess(val => val === "" ? undefined : val, schema).optional();
}