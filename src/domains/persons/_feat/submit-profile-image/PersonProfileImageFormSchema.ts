import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";

/**
 * Allowed MIME types for uploaded profile images.
 *
 * Accepted formats:
 * - `"image/jpeg"`
 * - `"image/png"`
 * - `"image/webp"`
 */
const ACCEPTED_PROFILE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
/**
 * Schema for initial profile image form values.
 *
 * Uses {@link FormStarterValueSchema} for progressive form state handling.
 * - `profileImage` — The raw initial value, which may be empty or a `File`.
 */
export const PersonProfileImageFormValuesSchema = z.object({
    profileImage: FormStarterValueSchema,
});
/**
 * Schema for validated profile image form submission.
 *
 * Ensures that:
 * - A file is provided.
 * - The file is a valid `File` instance.
 * - The file is not empty.
 * - The file is one of the accepted image MIME types.
 *
 * ### Validation Rules
 * - `profileImage` — Required, instance of `File`.
 *
 * ### Refinements
 * - Rejects non-`File` values with `"Must be a File instance."`.
 * - Rejects empty files (`size <= 0`) with `"Cannot upload empty file."`.
 * - Rejects files with unsupported MIME types with `"Accepted Image Types: JPG, JPEG, PNG, WEBP."`.
 */
export const PersonProfileImageFormSchema = z.object({
    profileImage: z.instanceof(File, {message: "Required."}),
}).superRefine((values, ctx) => {
    const {profileImage} = values;
    const code = "custom";
    const path = ["profileImage"];

    // Must be a File instance
    if (!(profileImage instanceof File)) {
        ctx.addIssue({code, path, message: "Must be a File instance."});
    }

    // Cannot upload empty file
    if (profileImage instanceof File && profileImage.size <= 0) {
        ctx.addIssue({code, path, message: "Cannot upload empty file."});
    }

    // File must be of accepted type
    if (profileImage instanceof File && !ACCEPTED_PROFILE_IMAGE_TYPES.includes(profileImage.type)) {
        ctx.addIssue({code, path, message: "Accepted Image Types: JPG, JPEG, PNG, WEBP."});
    }
});
export type PersonProfileImageFormValues = z.infer<typeof PersonProfileImageFormValuesSchema>;
export type PersonProfileImageForm = z.infer<typeof PersonProfileImageFormSchema>;