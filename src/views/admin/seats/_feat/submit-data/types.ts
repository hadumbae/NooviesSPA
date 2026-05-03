/**
 * @fileoverview Type definition for seat form disable field states.
 */

import {SeatFormValues} from "@/domains/seats/_feat/submit-data";

/** Defines the disabled state for each field in the seat form. */
export type SeatFormDisableFields = Partial<Record<keyof SeatFormValues, boolean>>;