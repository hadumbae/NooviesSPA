/**
 * @fileoverview Utility function and type for transforming raw or detailed movie models into form edit data.
 */

import {AnyValues} from "@/common/_types";
import {Movie, MovieDetails, MovieFormData} from "@/domains/movies";

/** Form values type for editing existing movie entity fields. */
export type MovieEditData = AnyValues<MovieFormData>;

/** Transforms a Movie or MovieDetails entity into a form-compatible payload for editing. */
export function buildMovieEditData(data: Movie | MovieDetails): MovieEditData {
    return {
        ...data,
        genres: data.genres.map(g => typeof g === "string" ? g : g._id),
        releaseDate: data.releaseDate?.toFormat("yyyy-MM-dd") ?? "",
    };
}