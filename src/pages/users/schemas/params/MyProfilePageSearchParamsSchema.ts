/**
 * @file MyProfilePageSearchParamsSchema.ts
 *
 * Zod schema for validating My Profile page search parameters.
 * Used to parse and normalize URL query state.
 */

import {z} from "zod";
import {MyProfilePageActiveTabSchema} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Runtime schema for My Profile page query parameters.
 *
 * - Validates the active tab
 * - Normalizes pagination values
 * - Applies default page numbers when missing
 */
export const MyProfilePageSearchParamsSchema = z.object({
    /** Currently active profile page tab */
    activeTab: MyProfilePageActiveTabSchema.optional().default("password"),

    /** Reservations pagination page */
    resPage: CleanedPositiveNumberSchema.optional().default(1),

    /** Reviews pagination page */
    rvwPage: CleanedPositiveNumberSchema.optional().default(1),

    /** Favourites pagination page */
    favPage: CleanedPositiveNumberSchema.optional().default(1),
});

/**
 * Normalized and type-safe profile page search parameters.
 */
export type MyProfilePageSearchParams =
    z.infer<typeof MyProfilePageSearchParamsSchema>;
