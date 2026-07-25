/**
 * @fileoverview Utility for parsing and validating raw search parameter strings against a Zod schema.
 */

import { z, ZodObject, ZodRawShape } from "zod";
import {buildStandardLog} from "@/common/_feat/logger-builders/buildStandardLog.ts";

/** Configuration parameters for the parseSearchParams utility. */
type ParseParams<TObject extends ZodRawShape> = {
    schema: ZodObject<TObject>;
    paramStrings: Record<string, string | string[]>;
};

/**
 * Parses and validates raw search parameter strings against a provided Zod schema.
 */
export function parseSearchParams<TObject extends ZodRawShape>(
    params: ParseParams<TObject>
): z.infer<ZodObject<TObject>> {
    const {schema, paramStrings} = params;

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
            context: {error},
        });
    }

    const schemaShape = schema.shape;
    const queryValues = {} as z.infer<ZodObject<TObject>>;

    for (const key in schemaShape) {
        const validator = schemaShape[key];
        const {success, data} = validator.safeParse(paramStrings[key]);

        if ((success && data === undefined) || (!success && schemaSetDefaults[key] === undefined)) {
            continue;
        }

        queryValues[key] = (success ? data : schemaSetDefaults[key]) as z.infer<ZodObject<TObject>>[Extract<keyof TObject, string>];
    }

    return queryValues;
}