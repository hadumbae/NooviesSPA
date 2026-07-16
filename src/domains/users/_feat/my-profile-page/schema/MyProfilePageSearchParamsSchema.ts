/**
 * @fileoverview Zod schema for validating and parsing search parameters on the user profile page.
 */

import {z} from "zod";
import {MyProfilePageActiveTabSchema} from "@/domains/users/_feat";
import {preprocessOptionalField} from "@/common/_feat/validation-preprocessors";
import {CoercedPositiveNumberSchema} from "@/common/_schemas";

/** Schema defining the valid search parameters for the profile page including tab selection and pagination. */
export const MyProfilePageSearchParamsSchema = z.object({
    activeTab: MyProfilePageActiveTabSchema.optional().default("password"),
    resPage: preprocessOptionalField(CoercedPositiveNumberSchema).default(1),
    rvwPage: preprocessOptionalField(CoercedPositiveNumberSchema).default(1),
    favPage: preprocessOptionalField(CoercedPositiveNumberSchema).default(1),
});

/** Type representing the validated search parameters for the profile page. */
export type MyProfilePageSearchParams = z.infer<typeof MyProfilePageSearchParamsSchema>;
