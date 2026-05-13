/**
 * @fileoverview Defines the form value types for movie query options.
 */

import {AnyValues} from "@/common/types";

import {MovieQueryOptions} from "@/domains/movies/schema/queries";

/** Form values derived from movie query options. */
export type MovieQueryOptionFormValues = AnyValues<MovieQueryOptions>;
