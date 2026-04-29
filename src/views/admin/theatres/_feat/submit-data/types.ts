/** @fileoverview Type definition for theatre form field disabling configuration. */

import {TheatreFormStarterValues} from "@/domains/theatres/_feat/submit-data";

/** Map of theatre form fields to their disabled state. */
export type TheatreFormDisableFields = Partial<Record<keyof TheatreFormStarterValues, boolean>>;