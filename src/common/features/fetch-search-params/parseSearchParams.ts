/**
 * @file Utility for parsing and validating raw search parameter strings against a Zod schema.
 * @filename parseSearchParams.ts
 */

import { z, ZodObject, ZodRawShape } from "zod";
import buildStandardLog from "@/common/utility/features/logger/buildStandardLog.ts";

/**
 * Configuration parameters for the {@link parseSearchParams} utility.
 * * @template TObject - The Zod raw shape definition for the expected query parameters.
 */
type ParseParams<TObject extends ZodRawShape> = {
    /** The Zod object schema used to validate, coerce, and provide defaults for parameters. */
    schema: ZodObject<TObject>;
    /**
     * The raw key-value string pairs, typically extracted from a URL search query
     * via `URLSearchParams` or a custom stringification utility.
     */
    paramStrings: Record<string, string | string[]>;
};

/**
 * Validates raw search parameter strings against a schema, applying coercion and falling back to defaults.
 * @template TObject - The Zod raw shape representing the query structure.
 * @param params - Object containing the validation schema and the raw string data.
 * @returns A strictly typed and validated object where missing or invalid fields are replaced by schema defaults.
 */
export default function parseSearchParams<TObject extends ZodRawShape>(
    params: ParseParams<TObject>
): z.infer<ZodObject<TObject>> {
    const { schema, paramStrings } = params;

    let schemaSetDefaults: Partial<Record<keyof TObject, unknown>>;

    try {
        schemaSetDefaults = schema.parse({});
    } catch (error: unknown) {
        schemaSetDefaults = {};

        buildStandardLog({
            level: "warn",
            type: "ERROR",
            msg: "Failed to set default values for search params. Verify that schema allows for optional fields.",
            component: parseSearchParams.name,
            context: { error },
        });
    }

    const schemaShape = schema.shape;
    const queryValues = {} as z.infer<ZodObject<TObject>>;

    for (const key in schemaShape) {
        const validator = schemaShape[key];
        const { success, data } = validator.safeParse(paramStrings[key]);

        if ((success && data === undefined) || (!success && schemaSetDefaults[key] === undefined)) {
            continue;
        }

        queryValues[key] = (success ? data : schemaSetDefaults[key]) as z.infer<ZodObject<TObject>>[Extract<keyof TObject, string>];
    }

    return queryValues;
}