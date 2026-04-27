/** @fileoverview Type definitions for movie credit form field state management. */

import {MovieCreditFormValues} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormValues.ts";

/** Configuration for toggling the disabled state of specific movie credit form fields. */
export type MovieCreditFormDisableFields = Partial<Record<keyof MovieCreditFormValues, boolean>>;