/**
 * @fileoverview Validation schemas and types for the person profile image upload form.
 */

import {z} from "zod";
import {AnyValues} from "@/common/types";

/** List of MIME types allowed for profile image uploads. */
const ACCEPTED_PROFILE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Base Zod schema for the profile image form. */
export const PersonProfileImageFormBaseSchema = z.object({
    profileImage: z.instanceof(File, {message: "Required."}),
});

/** Zod schema for validating profile image file constraints and types. */
export const PersonProfileImageFormSchema = PersonProfileImageFormBaseSchema.superRefine((values, ctx) => {
    const {profileImage} = values;
    const code = "custom";
    const path = ["profileImage"];

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

/** Type representing the validated data for the profile image form. */
export type PersonProfileImageFormData = z.infer<typeof PersonProfileImageFormSchema>;

/** Type representing the raw input values for the profile image form. */
export type PersonProfileImageFormValues = AnyValues<PersonProfileImageFormData>;
