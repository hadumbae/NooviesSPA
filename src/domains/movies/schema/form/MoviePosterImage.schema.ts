/**
 * @fileoverview Zod schemas for movie poster image form initialisation and validation.
 */
import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {refineRequireImageFile} from "@/common/features/handle-image-upload";

/** Schema for the initial form state of a movie poster upload. */
export const MoviePosterImageFormValuesSchema = z
    .object({posterImage: FormStarterValueSchema});

/** Schema for validating the uploaded movie poster file. */
export const MoviePosterImageFormSchema = z
    .object({posterImage: z.instanceof(File, {message: "Required."})})
    .superRefine(refineRequireImageFile({field: "posterImage"}));
