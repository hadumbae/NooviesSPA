import {z} from "zod";

const ACCEPTED_PROFILE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const PersonProfileImageFormSchema = z.object({
    profileImage: z.union([z.literal(""), z.instanceof(File, {message: "Must be a file."})])
});

export type PersonProfileImageFormValues = z.infer<typeof PersonProfileImageFormSchema>;

export const PersonProfileImageSubmitSchema = PersonProfileImageFormSchema.superRefine(
    (values, ctx) => {
        const {profileImage} = values;
        const code = "custom";
        const path = ["profileImage"];

        if (profileImage === "") {
            ctx.addIssue({code, path, message: "Required."});
        }

        if (!(profileImage instanceof File)) {
            ctx.addIssue({code, path, message: "Must be a File instance."});
        }

        if (profileImage instanceof File && profileImage.size <= 0) {
            ctx.addIssue({code, path, message: "Cannot upload empty file."});
        }

        if (profileImage instanceof File && !ACCEPTED_PROFILE_IMAGE_TYPES.includes(profileImage.type)) {
            ctx.addIssue({code, path, message: "Accepted Image Types: JPG, JPEG, PNG, WEBP."});
        }
    }
)

export type PersonProfileImageSubmitObject = z.infer<typeof PersonProfileImageSubmitSchema>;