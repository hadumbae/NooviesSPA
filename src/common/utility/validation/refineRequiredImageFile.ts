import { RefinementCtx, z } from "zod";
import ACCEPTED_IMAGE_TYPES from "@/common/constants/AcceptedImageTypeConstant.ts";

type RefinementParams = {
    /** The name of the image field being refined (e.g., `"profileImage"` or `"posterImage"`). */
    field: string;
};

/**
 * Creates a reusable Zod `superRefine` callback that validates a required image file field.
 *
 * @remarks
 * This refinement enforces three conditions for the specified field:
 * 1. The value must be an instance of {@link File}.
 * 2. The file must not be empty (`size > 0`).
 * 3. The file’s MIME type must be included in {@link ACCEPTED_IMAGE_TYPES}.
 *
 * Each violation adds a custom fatal issue to the Zod context, preventing further validation.
 * This is particularly useful when validating file uploads in browser-based forms.
 *
 * @example
 * ```ts
 * const PersonProfileImageSchema = z
 *   .object({
 *     profileImage: z.instanceof(File, { message: "Required." }),
 *   })
 *   .superRefine(refineRequireImageFile({ field: "profileImage" }));
 * ```
 *
 * @typeParam TObject - The inferred object type passed from Zod’s refinement context.
 * @param params - Configuration object specifying the field name to validate.
 * @returns A refinement function suitable for Zod’s `superRefine`.
 */
export default function refineRequireImageFile<
    TObject extends Record<string, unknown>
>(params: RefinementParams) {
    const { field } = params;
    const path = [field];
    const code = "custom";

    return (values: TObject, ctx: RefinementCtx) => {
        const image = values[field];
        const fatal = true;

        // Must be a File instance
        if (!(image instanceof File)) {
            ctx.addIssue({ code, path, fatal, message: "Must be a File instance." });
            return z.NEVER;
        }

        // Cannot upload empty file
        if (image.size <= 0) {
            ctx.addIssue({ code, path, fatal, message: "Cannot upload empty file." });
            return z.NEVER;
        }

        // File must be of accepted type
        if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
            const acceptedTypes = ACCEPTED_IMAGE_TYPES
                .map(type => type.replace("image/", ""))
                .join(", ")
                .toUpperCase();

            ctx.addIssue({
                code,
                path,
                fatal,
                message: `Accepted Image Types: ${acceptedTypes}.`,
            });
            return z.NEVER;
        }
    };
}
