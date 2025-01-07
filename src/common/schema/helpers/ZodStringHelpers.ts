import {z} from "zod";

export const RequiredString = z
    .string({required_error: "Required", invalid_type_error: "Must be a valid string."})
    .trim();

export const IDString = z
    .string({required_error: "Required.", invalid_type_error: "Must be a valid ID string."})
    .length(24, "ID String must be exactly 24 characters.");

export const RefinedIDString = z
    .union([z.undefined(), IDString])
    .refine((id) => !!id, {message: "Required."});

export const EmailString = RequiredString
    .email({message: "Must be an email address."});

export const URLString = z
    .string()
    .url({message: "Must be a valid URL."});

export const EmptyString = z
    .literal("", {message: "Invalid Value."});

/**
 * Types
 */

export type ObjectId = z.infer<typeof IDString>;