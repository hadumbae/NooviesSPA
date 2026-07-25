/**
 * @fileoverview Defines the form value types for user index query options.
 *
 */

import {AnyValues} from "@/common/_types";
import {UserQueryOptions} from "@/domains/users/_schema/query-options";

/** Form values derived from the user query options schema. */
export type UserIndexQueryOptionFormValues = AnyValues<UserQueryOptions>;