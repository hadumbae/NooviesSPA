/**
 * @fileoverview Tab constants and configuration for the My Profile page.
 */

import {TabLabelKey} from "@/common/type/ui/UITabTypes.ts";

/** Canonical list of profile page tab keys. */
export const MyProfilePageTabListConstant = [
    "password",
    "reservations",
    "reviews",
    "favourites",
] as const;

/** Ordered list of profile page tabs with display labels. */
export const MyProfilePageTabKeysConstant: readonly TabLabelKey<typeof MyProfilePageTabListConstant[number]>[] = [
    {key: "password", label: "Update Password"},
    {key: "reservations", label: "My Reservations"},
    {key: "reviews", label: "My Reviews"},
    {key: "favourites", label: "My Favourites"},
] as const;
