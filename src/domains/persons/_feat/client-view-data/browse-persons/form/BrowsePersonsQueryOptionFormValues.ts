/**
 * @fileoverview Defines the form value types for the person browsing query options.
 */

import {AnyValues} from "@/common/_types";
import {BrowsePersonsQueryOptions} from "@/domains/persons/_feat/client-view-data";

/** Form values representing the query options for browsing persons. */
export type BrowsePersonsQueryOptionFormValues = AnyValues<BrowsePersonsQueryOptions>;