/**
 * @fileoverview Utility for preprocessing optional Zod fields by converting empty strings to undefined.
 */

import {ZodTypeAny} from "zod";
import {
    preprocessEmptyStringToUndefined
} from "@/common/_feat/validation-preprocessors/preprocessEmptyStringToUndefined.ts";

/** Wraps a Zod schema to treat empty strings as undefined and marks the field as optional. */
export function preprocessOptionalField<TSchema extends ZodTypeAny = ZodTypeAny>(schema: TSchema) {
    return preprocessEmptyStringToUndefined(schema.optional()).optional();
}