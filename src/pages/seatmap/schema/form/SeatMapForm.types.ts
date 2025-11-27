/**
 * # SeatMap Form Types
 *
 * This module provides TypeScript type aliases inferred from the seat map form
 * Zod schemas. These types are used throughout the application wherever
 * validated or form-friendly seat map data is required.
 *
 * ## Exports
 * - **SeatMapForm** — Strongly typed representation of validated seat map form data.
 * - **SeatMapFormValues** — Type representation of form-layer values, typically
 *   used with form libraries (e.g., React Hook Form), allowing partial or
 *   intermediate values.
 */

import {z} from "zod";
import {SeatMapFormSchema, SeatMapFormValuesSchema} from "@/pages/seatmap/schema/form/SeatMapForm.schema.ts";

/**
 * ## SeatMapForm
 *
 * The fully validated seat map form data structure inferred from
 * `SeatMapFormSchema`.
 * This represents the canonical, sanitized data after parsing and validation.
 *
 * @example
 * const form: SeatMapForm = {
 *   seat: "6530a8121e4f09c92f123abc",
 *   showing: "6530a8121e4f09c92f123def",
 *   price: 450,
 *   status: "AVAILABLE",
 * };
 */
export type SeatMapForm = z.infer<typeof SeatMapFormSchema>;

/**
 * ## SeatMapFormValues
 *
 * The type inferred from `SeatMapFormValuesSchema`, representing the form-layer
 * input state. This is typically used in UI frameworks where values may be
 * `string`, `undefined`, or otherwise unprocessed before schema parsing.
 *
 * This type is appropriate for:
 * - React Hook Form field values
 * - Intermediate form editing states
 * - Partial inputs prior to validation/transformation
 *
 * @example
 * const values: SeatMapFormValues = {
 *   seat: "6530a8121e4f09c92f123abc",
 *   showing: "6530a8121e4f09c92f123def",
 *   price: "",           // allowed in form state
 *   status: "SOLD",
 * };
 */
export type SeatMapFormValues = z.infer<typeof SeatMapFormValuesSchema>;
