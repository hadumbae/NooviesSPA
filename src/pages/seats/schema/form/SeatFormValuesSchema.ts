import { z } from "zod";
import { FormStarterValueSchema } from "@/common/schema/form/FormStarterValueSchema.ts";

/**
 * @file SeatFormValues.schema.ts
 *
 * Schema and Type Definitions for **initial ("starter") seat form values**.
 *
 * This module defines `SeatFormValuesSchema`, a Zod schema used for initializing
 * seat-related forms. Each field is wrapped with `FormStarterValueSchema`,
 * allowing empty, placeholder, or preliminary values before final validation
 * occurs during submission.
 *
 * The schema is intended for:
 * - Pre-populating UI forms with optional values
 * - Representing incomplete form state prior to full validation
 * - Providing a simple, predictable structure for form libraries
 */

/**
 * Zod schema defining the **starter/default values** for a seat form.
 *
 * All fields use {@link FormStarterValueSchema}, enabling them to hold
 * empty or placeholder values during form initialization.
 */
export const SeatFormValuesSchema = z.object({
    /**
     * Theatre ID the seat belongs to.
     * May be empty during initial form setup.
     */
    theatre: FormStarterValueSchema,

    /**
     * Screen ID within the selected theatre.
     * May be empty when the form is first loaded.
     */
    screen: FormStarterValueSchema,

    /**
     * Row identifier (e.g., "A", "B", "C").
     * Accepts placeholder values until user input is provided.
     */
    row: FormStarterValueSchema,

    /**
     * Seat number within the row.
     * May start as empty or undefined.
     */
    seatNumber: FormStarterValueSchema,

    /**
     * Optional seat label (e.g., "VIP-1" or "A12-Legroom").
     * May be left blank initially.
     */
    seatLabel: FormStarterValueSchema,

    /**
     * Seat type (e.g., regular, VIP).
     * Initially holds a starter value before user selection.
     */
    seatType: FormStarterValueSchema,

    /**
     * Layout type indicating map representation (seat, aisle, stair, etc.).
     * Initially may be empty.
     */
    layoutType: FormStarterValueSchema,

    /**
     * Whether the seat is available.
     * Defaults to starter/placeholder value until user interaction.
     */
    isAvailable: FormStarterValueSchema,

    /**
     * Price multiplier applied to the base ticket price.
     * Initialized as a starter value before validation.
     */
    priceMultiplier: FormStarterValueSchema,

    /**
     * X-coordinate for seat placement on a layout/map.
     * May be empty during initial placement.
     */
    x: FormStarterValueSchema,

    /**
     * Y-coordinate for seat placement on a layout/map.
     * May be empty during initial placement.
     */
    y: FormStarterValueSchema,
});

/**
 * Type representing the **starter/default values** for a single seat form.
 *
 * @remarks
 * This type is inferred directly from {@link SeatFormValuesSchema} and is
 * suitable for:
 * - React form initialization
 * - Prefilling controlled form components
 * - Holding partial or incomplete user input
 *
 * @example
 * ```ts
 * const defaultValues: SeatFormValues = {
 *   theatre: "",
 *   screen: "",
 *   row: "",
 *   seatNumber: "",
 *   seatLabel: "",
 *   seatType: "",
 *   layoutType: "",
 *   isAvailable: "",
 *   priceMultiplier: "",
 *   x: "",
 *   y: "",
 * };
 * ```
 */
export type SeatFormValues = z.infer<typeof SeatFormValuesSchema>;
