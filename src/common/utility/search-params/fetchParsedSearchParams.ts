import {z, ZodObject, ZodRawShape} from "zod";

type ParseParams<TObject extends ZodRawShape> = {
    schema: ZodObject<TObject>;
    raw: Record<string, any>;
};

export default function fetchParsedSearchParams<TObject extends ZodRawShape>(
    params: ParseParams<TObject>
): z.infer<ZodObject<TObject>> {
    const {schema, raw} = params;

    const defaultValues = schema.parse({});
    const schemaShape = schema.shape;
    const parsedParams = {} as z.infer<ZodObject<TObject>>;

    for (const key in schemaShape) {
        const validator = schemaShape[key];
        const {success, data} = validator.safeParse(raw[key]);

        if ((success && data === undefined) || (!success && defaultValues[key] === undefined)) {
            continue;
        }

        parsedParams[key] = success ? data : defaultValues[key];
    }

    return parsedParams;
}