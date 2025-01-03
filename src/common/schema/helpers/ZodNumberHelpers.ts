import {z} from "zod";

export const RequiredNumber = z
    .coerce
    .number({required_error: "Required.", invalid_type_error: "Must be a valid number."});

export const TotalItemsNumber = RequiredNumber
    .min(0, "Must be 0 or more.")