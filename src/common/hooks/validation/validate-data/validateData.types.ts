import {ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * Parameters for validating data against a Zod schema.
 *
 * @template TData - The type of the data to validate.
 * @template TSchema - The Zod schema type used for validation.
 */
export type ValidateDataParams<TData = unknown, TSchema extends ZodTypeAny = ZodTypeAny> = {
    /** The input data to validate */
    data: TData;
    /** The Zod schema to validate the data against */
    schema: TSchema;
    /** Optional custom error message if validation fails */
    message?: string;
}

/**
 * Represents a successful validation result.
 *
 * @template TReturn - The type of the successfully validated data.
 */
type ValidResults<TReturn> = {
    /** Indicates the validation was successful */
    success: true;
    /** The validated and parsed data */
    data: TReturn;
    /** No error on successful validation */
    error: null;
};

/**
 * Represents a failed validation result.
 */
type InvalidResults = {
    /** Indicates the validation failed */
    success: false;
    /** No valid data when validation fails */
    data: null;
    /** The error detailing validation failure */
    error: ParseError;
};

/**
 * The union type representing either a successful or failed data validation result.
 *
 * @template TReturn - The type of the valid data if validation succeeded.
 */
export type DataValidationResults<TReturn> = ValidResults<TReturn> | InvalidResults;