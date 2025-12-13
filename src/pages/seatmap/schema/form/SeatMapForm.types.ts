/**
 * @file SeatMapFormTypes.ts
 * @summary TypeScript types inferred from SeatMap form Zod schemas.
 *
 * Provides strongly typed representations of seat map form data:
 * - `SeatMapForm` — Fully validated form data after parsing.
 * - `SeatMapFormValues` — Form-layer values for UI libraries (e.g., React Hook Form), allowing partial or intermediate input.
 */

import { z } from "zod";
import { SeatMapFormSchema, SeatMapFormValuesSchema } from "@/pages/seatmap/schema/form/SeatMapForm.schema.ts";

/**
 * @summary Fully validated seat map form data.
 *
 * Represents canonical, sanitized data after parsing with `SeatMapFormSchema`.
 *
 * @example
 * const form: SeatMapForm = {
 *   seat: "6530a8121e4f09c92f123abc",
 *   showing: "6530a8121e4f09c92f123def",
 *   basePrice: 450,
 *   priceMultiplier: 1.5,
 *   overridePrice: undefined,
 *   status: "AVAILABLE",
 * };
 */
export type SeatMapForm = z.infer<typeof SeatMapFormSchema>;

/**
 * @summary Form-layer seat map values.
 *
 * Inferred from `SeatMapFormValuesSchema`. Supports intermediate/partial
 * values as commonly used in UI frameworks like React Hook Form.
 * Fields may be empty strings or undefined before final parsing.
 *
 * @example
 * const values: SeatMapFormValues = {
 *   seat: "6530a8121e4f09c92f123abc",
 *   showing: "6530a8121e4f09c92f123def",
 *   basePrice: "",           // allowed in form state
 *   priceMultiplier: "1.2",
 *   overridePrice: "",
 *   status: "SOLD",
 * };
 */
export type SeatMapFormValues = z.infer<typeof SeatMapFormValuesSchema>;
