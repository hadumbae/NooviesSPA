/**
 * @fileoverview Zod schemas and types for the genre image upload form.
 */

import {z} from "zod";
import {refineRequireImageFile} from "@/common/_feat/handle-image-upload";
import {FileInstanceSchema} from "@/common/_schemas/file-uploads";
import {AnyValues} from "@/common/types";

/** Base schema for genre image upload containing the raw file field. */
export const GenreImageUploadBaseFormSchema = z.object({
    image: FileInstanceSchema,
});

/** Type definition for the base genre image upload form. */
export type GenreImageUploadBaseForm = z.infer<typeof GenreImageUploadBaseFormSchema>;

/** Form schema for genre image upload with file validation refinements. */
export const GenreImageUploadFormSchema = GenreImageUploadBaseFormSchema
    .superRefine(refineRequireImageFile({field: "image"}));

/** Validated data for the genre image upload form. */
export type GenreImageUploadFormData = z.infer<typeof GenreImageUploadFormSchema>;

/** Raw input values for the genre image upload form. */
export type GenreImageUploadFormValues = AnyValues<GenreImageUploadFormData>;