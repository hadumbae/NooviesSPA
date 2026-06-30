/**
 * @fileoverview Zod schema and type for strings that require automatic whitespace trimming.
 */

import { z } from "zod";
import {StringValueSchema} from "@/common/_schemas/strings/StringValueSchema.ts";

/** Zod schema that validates a string and trims leading and trailing whitespace. */
export const TrimmedStringSchema = StringValueSchema.trim();

/** TypeScript type inferred from TrimmedStringSchema. */
export type TrimmedString = z.infer<typeof TrimmedStringSchema>;
