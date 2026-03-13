/**
 * @file ScreenDetailsActiveTabEnumSchema.ts
 *
 * Zod enum defining the valid active tabs for the
 * Screen Details admin page.
 *
 * Used for:
 * - URL search param validation
 * - Tab state synchronization
 * - Strongly typed tab identifiers
 */

import {z} from "zod";

/**
 * Allowed Screen Details tab identifiers.
 */
export const ScreenDetailsActiveTabEnum = z.enum(
    ["showings", "view-seats", "create-seats"],
    {
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) {
                return {message: "Invalid tab value."};
            }

            if (issue.code === z.ZodIssueCode.invalid_type) {
                return {message: "Tab value must be a string."};
            }

            return {message: ctx.defaultError};
        },
    }
);

/**
 * Inferred union type of valid screen detail tabs.
 */
export type ScreenDetailsActiveTab = z.infer<typeof ScreenDetailsActiveTabEnum>;
