/**
 * @fileoverview Zod schemas for movie poster image form initialization and validation.
 */

import {z} from "zod";
import {refineRequireImageFile} from "@/common/_feat/handle-image-upload";
import {AnyValues} from "@/common/_types";

/** Schema for validating the uploaded movie poster file and ensuring it is not empty. */
export const MovieImageFormSchema = z.object({
    image: z.instanceof(File, {message: "Required."}),
}).superRefine(refineRequireImageFile({field: "image"}));

/** Form type inferred from the movie poster image schema. */
export type MovieImageFormData = z.infer<typeof MovieImageFormSchema>;

/** Type representing the raw input values for the movie poster image form. */
export type MovieImageFormValues = AnyValues<MovieImageFormData>;
