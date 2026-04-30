/**
 * @fileoverview Type definitions for the theatre screen submission form.
 */

import {TheatreScreenFormValues} from "@/domains/theatre-screens/_feat/submit-data";

/** Type representing the disabled state fields for a theatre screen form. */
export type TheatreScreenFormDisableFields = Partial<Record<keyof TheatreScreenFormValues, boolean>>;