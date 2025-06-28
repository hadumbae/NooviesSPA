import {ZodObject, ZodRawShape} from "zod";

type ParseParams<TObject extends ZodRawShape> = {
    schema: ZodObject<TObject>;
    raw: Record<string, any>;
};

export default function fetchParsedSearchParams<TObject extends ZodRawShape>(
    params: ParseParams<TObject>
): Record<string, any> {
    const {schema, raw} = params;

    const defaultValues = schema.parse({});
    const schemaShape = schema.shape;
    const parsedParams = {} as Record<string, any>;

    for (const key in schemaShape) {
        const validator = schemaShape[key];
        const {success, data} = validator.safeParse(raw[key]);
        parsedParams[key] = success ? data : defaultValues[key];
    }

    return parsedParams;
}