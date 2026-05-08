/** @fileoverview Zod schemas and types for the genre image upload form. */

import {z} from "zod";
import {refineRequireImageFile} from "@/common/features/handle-image-upload";
import {FileInstanceSchema} from "@/common/_schemas/file-uploads";

/** Base schema for genre image upload containing the raw file field. */
export const GenreImageUploadBaseFormSchema = z.object({
    image: FileInstanceSchema,
});

/** Type definition for the base genre image upload form. */
export type GenreImageUploadBaseForm = z.infer<typeof GenreImageUploadBaseFormSchema>;

/**
 * Form schema for genre image upload with file validation refinements.
 */
export const GenreImageUploadFormSchema = GenreImageUploadBaseFormSchema
    .superRefine(refineRequireImageFile({field: "image"}));

/** Type definition for the validated genre image upload form. */
export type GenreImageUploadFormData = z.infer<typeof GenreImageUploadFormSchema>;
