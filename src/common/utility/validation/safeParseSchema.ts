import {SafeParseReturnType, ZodIssue, ZodTypeAny} from "zod";

export default function safeParseSchema<T extends ZodTypeAny, D = any>(
    {schema, data}: { schema: T, data: any }
): {
    data: D | null,
    errors: ZodIssue[] | null
} {
    const result: SafeParseReturnType<T, D> = schema.safeParse(data);
    if (result.success) return {data: result.data, errors: null};
    return {data: null, errors: result.error.errors};
}