/**
 * @fileoverview Zod refinement factory for validating uploaded image File instances.
 */

import {RefinementCtx, z} from "zod";
import ACCEPTED_IMAGE_TYPES from "@/common/constants/AcceptedImageTypeConstant.ts";

/** Props configuration for the refineRequireImageFile function. */
type RefinementConfig = {
    field: string;
};

/**
 * Creates a Zod refinement function to validate that an object property is a valid, non-empty image file matching accepted MIME types.
 */
export function refineRequireImageFile<TObject extends Record<string, unknown>>(
    {field}: RefinementConfig
): z.Refinement<TObject> {
    const path = [field];
    const code = "custom";

    return (values: TObject, ctx: RefinementCtx) => {
        const image = values[field];
        const fatal = true;

        if (!(image instanceof File)) {
            ctx.addIssue({code, path, fatal, message: "Must be a File instance."});
            return z.NEVER;
        }

        if (image.size <= 0) {
            ctx.addIssue({code, path, fatal, message: "Cannot upload empty file."});
            return z.NEVER;
        }

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