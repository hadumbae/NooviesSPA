/**
 * @fileoverview Zod schema for validating native File objects.
 */

import {z} from "zod";

/** Zod schema that validates an input is an instance of the File class. */
export const FileInstanceSchema = z.instanceof(File, {message: "Required."});

/** Type definition for a validated File instance. */
export type FileInstance = z.infer<typeof FileInstanceSchema>;