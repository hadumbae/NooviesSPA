/**
 * @fileoverview Action trigger components for managing movie image assets within the movie details view.
 */

import {ObjectId} from "@/common/_schemas";

/** Props for the MovieDetailsPageActions component. */
export type MovieDetailsPageActionsProps = {
    movieID: ObjectId;
    className?: string;
};