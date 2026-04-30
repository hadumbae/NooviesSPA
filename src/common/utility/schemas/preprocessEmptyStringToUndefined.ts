import {z, ZodTypeAny} from "zod";

/**
 * Preprocesses empty string values as undefined.
 */
export default function preprocessEmptyStringToUndefined<TSchema extends ZodTypeAny = ZodTypeAny>(schema: TSchema) {
    return z.preprocess(val => val === "" ? undefined : val, schema).optional();
}