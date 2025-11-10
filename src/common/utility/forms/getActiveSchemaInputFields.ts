import { ZodObject, ZodRawShape } from "zod";

/**
 * Parameters for {@link getActiveSchemaInputFields}.
 *
 * @template TShape - The Zod raw shape describing the schema fields.
 */
type InputFieldParams<TShape extends ZodRawShape> = {
    /**
     * The Zod object schema whose fields will be processed.
     */
    schema: ZodObject<TShape>;

    /**
     * Optional list of schema field keys that should be marked as disabled.
     * Any field name included here will be assigned a `false` value
     * in the resulting object.
     */
    disableFields?: (keyof TShape)[];
};

/**
 * Return type for {@link getActiveSchemaInputFields}.
 *
 * Produces a mapped object whose keys correspond to the schema fields
 * and values are booleans indicating whether the field is active (`true`)
 * or disabled (`false`).
 *
 * @template TShape - The Zod raw shape describing the schema fields.
 */
type InputFieldReturns<TShape extends ZodRawShape> = {
    [key in keyof TShape]: boolean;
};

/**
 * Generates an object mapping each field of a Zod schema to a boolean value
 * that indicates whether that field is active or disabled.
 *
 * - Fields present in `disableFields` will be assigned `false`.
 * - All other fields will be assigned `true`.
 *
 * This function is useful for form systems or dynamic UI builders
 * where you need to control which inputs are currently enabled.
 *
 * @example
 * ```ts
 * const schema = z.object({
 *   name: z.string(),
 *   age: z.number(),
 *   email: z.string().email(),
 * });
 *
 * const activeFields = getActiveSchemaInputFields({
 *   schema,
 *   disableFields: ["email"],
 * });
 *
 * // Result:
 * // {
 * //   name: true,
 * //   age: true,
 * //   email: false
 * // }
 * ```
 *
 * @template TShape - The Zod raw shape type.
 * @param params - An object containing the Zod schema and optional list of disabled field keys.
 * @returns An object mapping schema field names to booleans indicating active/disabled state.
 */
export default function getActiveSchemaInputFields<TShape extends ZodRawShape>(
    params: InputFieldParams<TShape>
): InputFieldReturns<TShape> {
    const {
        schema: { shape },
        disableFields = [],
    } = params;

    const keys = Object.keys(shape) as (keyof TShape)[];

    return Object.fromEntries(
        keys.map(key => [key, !disableFields.includes(key)])
    ) as InputFieldReturns<TShape>;
}
