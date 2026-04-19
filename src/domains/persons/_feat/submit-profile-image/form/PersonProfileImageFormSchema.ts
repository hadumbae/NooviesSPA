/**
 * @fileoverview Validation schemas for uploading a person's profile image.
 */

import {z} from "zod";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";

/** Allowed MIME types for profile images. */
const ACCEPTED_PROFILE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Base schema defining the raw file field. */
const PersonProfileImageFormBaseSchema = z.object({
    /** The image file selected via the file input. */
    profileImage: z.instanceof(File, {message: "Required."}),
});

/** Extended schema for initial form state management. */
export const PersonProfileImageFormValuesSchema = generateFormValueSchema(PersonProfileImageFormBaseSchema);

/** Validated type for initial profile image form values. */
export type PersonProfileImageFormValues = z.infer<typeof PersonProfileImageFormValuesSchema>;

/** Comprehensive form schema with specific file validation. */
export const PersonProfileImageFormSchema = PersonProfileImageFormBaseSchema.superRefine((values, ctx) => {
    const {profileImage} = values;
    const code = "custom";
    const path = ["profileImage"];

    console.log("Here!");

    if (!(profileImage instanceof File)) {
        ctx.addIssue({code, path, message: "Must be a File instance."});
    }

    if (profileImage instanceof File && profileImage.size <= 0) {
        ctx.addIssue({code, path, message: "Cannot upload empty file."});
    }

    if (profileImage instanceof File && !ACCEPTED_PROFILE_IMAGE_TYPES.includes(profileImage.type)) {
        ctx.addIssue({code, path, message: "Accepted Image Types: JPG, JPEG, PNG, WEBP."});
    }
});

/** Validated type for the profile image upload form. */
export type PersonProfileImageFormData = z.infer<typeof PersonProfileImageFormSchema>;
