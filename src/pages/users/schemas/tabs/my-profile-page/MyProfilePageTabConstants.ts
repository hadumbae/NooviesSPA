/**
 * @file MyProfilePageTabConstants.ts
 *
 * Tab constants and configuration for the My Profile page.
 * Separates tab keys from display metadata.
 */

import {TabLabelKey} from "@/common/type/ui/UITabTypes.ts";

/**
 * Canonical list of profile page tab keys.
 */
const tabs = [
    "password",
    "reservations",
    "reviews",
    "favourites",
] as const;

/**
 * Ordered list of profile page tabs with display labels.
 */
const tabKeys: readonly TabLabelKey<
    typeof tabs[number],
    string
>[] = [
    {key: "password", label: "Update Password"},
    {key: "reservations", label: "My Reservations"},
    {key: "reviews", label: "My Reviews"},
    {key: "favourites", label: "My Favourites"},
] as const;

export {
    tabs as MyProfilePageTabListConstant,
    tabKeys as MyProfilePageTabKeysConstant,
};
