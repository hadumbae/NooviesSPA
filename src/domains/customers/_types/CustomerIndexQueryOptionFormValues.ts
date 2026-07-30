/**
 * @fileoverview Types for the customer index query options form.
 */

import {AnyValues} from "@/common/_types";
import {CustomerQueryOptions} from "@/domains/customers/_schema/query-options";

/** Form values for the customer index query options. */
export type CustomerIndexQueryOptionFormValues = AnyValues<CustomerQueryOptions>;