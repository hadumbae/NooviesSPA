import { z, ZodObject, ZodRawShape } from "zod";
import buildStandardLog from "@/common/utility/logger/buildStandardLog.ts";

/**
 * Parameters for `fetchParsedSearchParams`.
 *
 * @typeParam TObject - A Zod raw shape representing the expected schema of search parameters.
 */
type ParseParams<TObject extends ZodRawShape> = {
    /** Zod object schema used to validate and parse search parameters. */
    schema: ZodObject<TObject>;
    /** Raw input search parameters, typically `Record<string, any>` from a URL or form. */
    raw: Record<string, any>;
};

/**
 * Parses search parameters and fills them with default values for any parameters
 * that are missing or fail validation.
 *
 * @remarks
 * - Validates each property of `raw` against the provided Zod `schema`.
 * - Uses schema defaults if the raw value is missing or invalid.
 * - Logs a warning if the schema does not provide default values.
 * - Returns an object matching the shape of the schema with validated values.
 *
 * @typeParam TObject - The Zod raw shape type used to define the schema.
 *
 * @param params - An object containing:
 *   - `schema`: Zod schema defining expected keys and types.
 *   - `raw`: The unvalidated input object (e.g., parsed URL search params).
 *
 * @returns An object with validated search parameters, with defaults applied
 *   for missing or invalid values.
 *
 * @example
 * ```ts
 * const schema = z.object({
 *   page: z.number().optional().default(1),
 *   pageSize: z.number().optional().default(10),
 * });
 *
 * const rawParams = { page: "2" };
 * const parsed = fetchParsedSearchParams({ schema, raw: rawParams });
 * // parsed -> { page: 2, pageSize: 10 }
 * ```
 */
export default function fetchParsedSearchParams<TObject extends ZodRawShape>(
    params: ParseParams<TObject>
): z.infer<ZodObject<TObject>> {
    const { schema, raw } = params;

    let defaultValues: Partial<Record<keyof TObject, unknown>>;

    try {
        // Attempt to parse an empty object to extract defaults from the schema
        defaultValues = schema.parse({});
    } catch (error: unknown) {
        // If schema does not allow empty object, fallback to empty defaults
        defaultValues = {};

        buildStandardLog({
            level: "warn",
            type: "ERROR",
            msg: "Failed to set default values for search params. Verify that schema allows for optional fields.",
            component: fetchParsedSearchParams.name,
            context: { error },
        });
    }

    const schemaShape = schema.shape;
    const parsedParams = {} as z.infer<ZodObject<TObject>>;

    for (const key in schemaShape) {
        const validator = schemaShape[key];
        const { success, data } = validator.safeParse(raw[key]);

        // Skip if value is undefined and default is also undefined
        if ((success && data === undefined) || (!success && defaultValues[key] === undefined)) {
            continue;
        }

        parsedParams[key] = success ? data : defaultValues[key];
    }

    return parsedParams;
}
