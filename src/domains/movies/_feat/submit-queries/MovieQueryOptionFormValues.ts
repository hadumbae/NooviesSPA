/**
 * @fileoverview Defines the form value types for movie query options.
 */

import {AnyValues} from "@/common/types/form/AnyValues";
import {MovieQueryOptions} from "@/domains/movies/_schema/queries/MovieQueryOptionSchema";

/** Form values derived from movie query options. */
export type MovieQueryOptionFormValues = AnyValues<MovieQueryOptions>;