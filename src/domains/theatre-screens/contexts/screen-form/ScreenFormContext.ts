/**
 * @file ScreenFormContext.ts
 * @summary
 * React context for managing the full lifecycle of a screen form,
 * including initial values, active values, returned data, and
 * configurable behavior shared across form-related components.
 *
 * @see FormContextValues
 */

import {FormContextValues} from "@/common/type/context/FormContextValues.ts";
import {createContext} from "react";
import {TheatreScreen} from "@/domains/theatre-screens/schema/model";
import {TheatreScreenFormValues} from "@/domains/theatre-screens/_feat/submit-data/TheatreScreenFormValuesSchema.ts";
import {TheatreScreenFormData} from "@/domains/theatre-screens/_feat/submit-data/TheatreScreenFormSchema.ts";

/**
 * Context value type for the screen form.
 *
 * Specializes the generic {@link FormContextValues} using:
 * - `ScreenFormValues` — form input values
 * - `ScreenForm` — payload submitted to the server
 * - `Screen` — entity representation for edit-by-entity logic
 */
type ScreenFormContextValues =
    FormContextValues<TheatreScreenFormValues, TheatreScreenFormData, TheatreScreen>;

/**
 * React context containing screen form state and behavior.
 *
 * Components must be wrapped in a matching provider before consuming this context.
 * When accessed outside a provider, the value is `undefined`.
 */
export const ScreenFormContext = createContext<ScreenFormContextValues | undefined>(undefined);

ScreenFormContext.displayName = "ScreenFormContext";
