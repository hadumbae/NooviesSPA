/**
 * @file ReservationButtonCSS.ts
 *
 * Shared CSS class definitions for seat selection buttons.
 *
 * Centralizes visual state styling for selected and
 * unselected seats across reservation seat map components.
 */

import {cn} from "@/common/lib/utils.ts";

/**
 * CSS classes for a selected seat button.
 */
export const SelectedSeatButtonCSS = cn(
    "bg-blue-600 hover:bg-blue-500",
    "dark:bg-blue-600 dark:text-white dark:hover:bg-blue-800",
);

/**
 * CSS classes for an unselected seat button.
 */
export const UnselectedSeatButtonCSS = cn(
    "bg-gray-400 text-black hover:bg-gray-600 hover:text-white",
    "dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700",
);
