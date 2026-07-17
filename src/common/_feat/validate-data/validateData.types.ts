/**
 * @fileoverview Type definitions for data validation results and parameters using Zod.
 */

import {ZodTypeAny} from "zod";
import {ParseError} from "@/common/_err/ParseError.ts";

/** Parameters for the validateData utility function. */
export type ValidateDataParams<TData = unknown, TSchema extends ZodTypeAny = ZodTypeAny> = {
    data: TData;
    schema: TSchema;
    message?: string;
}

type ValidResults<TReturn> = { success: true, data: TReturn, error: null };
type InvalidResults = { success: false, data: null, error: ParseError };

/** Discriminated union representing the result of a data validation attempt. */
export type DataValidationResults<TReturn> = ValidResults<TReturn> | InvalidResults;