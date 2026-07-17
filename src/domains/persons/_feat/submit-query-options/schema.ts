/**
 * @fileoverview Schema definitions for the person query options form values.
 */

import {AnyValues} from "@/common/_types";
import {PersonQueryOptions} from "@/domains/persons/_schema";

/** Form values for person query options derived from the base schema. */
export type PersonQueryOptionFormValues = AnyValues<PersonQueryOptions>;
