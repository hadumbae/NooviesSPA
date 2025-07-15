import {z, ZodTypeAny} from "zod";

const service = {
    cleanNumberInput: <TSchema extends ZodTypeAny>(schema: TSchema) => z
        .preprocess(
            (val) => {
                if (val === "" || val === null || val === undefined) return undefined;
                const num = Number(val);
                return !Number.isNaN(num) ? num : undefined;
            },
            schema,
        ),
}

export default service;