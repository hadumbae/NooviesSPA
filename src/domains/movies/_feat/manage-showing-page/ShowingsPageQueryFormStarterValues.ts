/**
 * @fileoverview Defines the Zod schema and type for the showings page query form values.
 */

import {AnyValues} from "@/common/types";
import {ShowingsPageQueryStrings,} from "@/domains/movies/_feat/client-view-data";

/** Type definition for the showings page query form values. */
export type ShowingsPageQueryFormStarterValues = AnyValues<ShowingsPageQueryStrings>;