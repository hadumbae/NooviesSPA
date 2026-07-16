/**
 * @fileoverview Zod validation schema and type definitions for initializing Theatre Screen form states.
 */

import {TheatreScreenFormData} from "@/domains/theatre-screens/_feat/submit-data/schema/TheatreScreenFormSchema.ts";
import {AnyValues} from "@/common/types";

/**
 * TypeScript type representing the initial or "in-progress" values of a Theatre Screen form.
 */
export type TheatreScreenFormValues = AnyValues<TheatreScreenFormData>;