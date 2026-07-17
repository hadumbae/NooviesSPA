/**
 * @fileoverview Utility for validating data against Zod schemas with custom error handling.
 */

import {z, ZodTypeAny} from "zod";
import {ParseError} from "@/common/_err/ParseError.ts";
import {DataValidationResults, ValidateDataParams} from "@/common/_feat/validate-data/validateData.types.ts";

/** Validates input data against a provided Zod schema and returns a structured result or a ParseError. */
export function validateData<TData = unknown, TSchema extends ZodTypeAny = ZodTypeAny>(
    {data, schema, message}: ValidateDataParams<TData, TSchema>
): DataValidationResults<z.infer<TSchema>> {
    const {data: parsedData, success, error: parseError} = schema.safeParse(data);

    if (success) return {success: true, data: parsedData, error: null};
    const error = new ParseError({message: message ?? "Invalid Data.", errors: parseError.errors, raw: data,});
    return {success: false, data: null, error};
}