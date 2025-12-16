import { createContext } from "react";
import { FormContextValues } from "@/common/type/context/FormContextValues.ts";
import { SeatMapForm, SeatMapFormValues } from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";
import { SeatMap } from "@/pages/seatmap/schema/model/SeatMap.types.ts";

/**
 * @summary
 * Context value type for the SeatMap form.
 *
 * @remarks
 * Binds together:
 * - Form input values (`SeatMapFormValues`)
 * - Zod-backed form schema (`SeatMapForm`)
 * - Persisted SeatMap model (`SeatMap`)
 *
 * Used to provide strongly-typed access to SeatMap form state,
 * validation, and submission helpers.
 */
export type SeatMapFormContextValues =
    FormContextValues<SeatMapFormValues, SeatMapForm, SeatMap>;

/**
 * @summary
 * React context for the SeatMap form.
 *
 * @remarks
 * - Intended to be consumed via `useRequiredContext`.
 * - Initialized as `undefined` to enforce provider usage.
 */
export const SeatMapFormContext =
    createContext<SeatMapFormContextValues | undefined>(undefined);
