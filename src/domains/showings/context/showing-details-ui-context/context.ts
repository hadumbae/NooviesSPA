/**
 * @fileoverview React contexts for managing the UI state and setters of the showing details view.
 */

import {
    ShowingDetailsUISetterContextValues,
    ShowingDetailsUIStateContextValues
} from "@/domains/showings/context/showing-details-ui-context/values.ts";
import {createContext} from "react";

/** Context providing the current UI state for showing details. */
export const ShowingDetailsUIStateContext = createContext<ShowingDetailsUIStateContextValues | undefined>(undefined);

/** Context providing functions to update the UI state for showing details. */
export const ShowingDetailsUISetterContext = createContext<ShowingDetailsUISetterContextValues | undefined>(undefined);
