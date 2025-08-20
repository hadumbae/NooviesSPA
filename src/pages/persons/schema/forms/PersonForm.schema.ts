import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {ISO3166Alpha2CodeEnum} from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {NonFutureDateStringSchema} from "@/common/schema/dates/NonFutureDateStringSchema.ts";

/**
 * Schema for the raw form values entered when creating or editing a Person entity.
 *
 * This schema is intended for **initial form state** and **frontend validation**
 * rather than final server-side validation.
 * Each field uses {@link FormStarterValueSchema}, which typically accepts `string | null | undefined`
 * and is coerced into a standard format suitable for progressive form input handling.
 *
 * ### Shape
 * - `name` — The person's name as an initial form field value.
 * - `biography` — Short biography text as an initial form field value.
 * - `dob` — Date of birth as an initial form field value.
 * - `nationality` — Country code (ISO 3166-1 alpha-2) as an initial form field value.
 */
export const PersonFormValuesSchema = z.object({
    name: FormStarterValueSchema,
    biography: FormStarterValueSchema,
    dob: FormStarterValueSchema,
    nationality: FormStarterValueSchema,
});

/**
 * Schema for validated Person form submission.
 *
 * This schema is stricter than {@link PersonFormValuesSchema}, enforcing:
 * - Maximum string lengths.
 * - Non-empty requirements.
 * - Specific formats for date and nationality.
 *
 * ### Validation Rules
 * - `name` — Required, non-empty string, max 255 chars.
 * - `biography` — Required, non-empty string, max 1000 chars.
 * - `dob` — Must be a valid date string, of a date not in the future.
 * - `nationality` — Must match one of the ISO 3166-1 alpha-2 codes.
 */
export const PersonFormSchema = z.object({
    name: NonEmptyStringSchema.max(255, "Name must not be more than 255 characters."),
    biography: NonEmptyStringSchema.max(1000, "Must be 1000 characters or less."),
    dob: NonFutureDateStringSchema,
    nationality: ISO3166Alpha2CodeEnum,
});

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
    profileImage: z.instanceof(File, { message: "Required." }),
}).superRefine((values, ctx) => {
    const { profileImage } = values;
    const code = "custom";
    const path = ["profileImage"];

    // Must be a File instance
    if (!(profileImage instanceof File)) {
        ctx.addIssue({ code, path, message: "Must be a File instance." });
    }

    // Cannot upload empty file
    if (profileImage instanceof File && profileImage.size <= 0) {
        ctx.addIssue({ code, path, message: "Cannot upload empty file." });
    }

    // File must be of accepted type
    if (profileImage instanceof File && !ACCEPTED_PROFILE_IMAGE_TYPES.includes(profileImage.type)) {
        ctx.addIssue({ code, path, message: "Accepted Image Types: JPG, JPEG, PNG, WEBP." });
    }
});