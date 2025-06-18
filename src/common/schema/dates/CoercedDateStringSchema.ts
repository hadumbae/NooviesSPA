import {format, isValid, parse} from "date-fns";
import {z} from "zod";

export const CoercedDateStringSchema = z
    .string({message: "Required", invalid_type_error: "Must be a valid date string."})
    .refine(
        (val) => isValid(parse(val, "yyyy-MM-dd", new Date())),
        {message: "Must be a valid date in the yyyy-MM-dd format."},
    )
    .transform((val) => {
        const parsed = parse(val, "yyyy-MM-dd", new Date());
        return format(parsed, "yyyy-MM-dd")
    });