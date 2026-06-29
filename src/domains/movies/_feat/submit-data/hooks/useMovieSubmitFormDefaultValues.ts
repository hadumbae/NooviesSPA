/**
 * @fileoverview Hook for computing and stabilizing default values for the movie submission form.
 */

import {Movie} from "@/domains/movies/_schema/movie/MovieSchema.ts";
import {isEqual} from "lodash";

import {useRef} from "react";

import {MovieFormStarterValues} from "@/domains/movies/_feat/submit-data/schema/MovieFormSchema.ts";

/** Configuration options for movie form default values. */
type DefaultConfig = {
    presetValues?: Partial<MovieFormStarterValues>;
    movie?: Movie;
}

/**
 * Computes initial form values by merging base defaults, existing movie data, and optional presets.
 */
export function useMovieSubmitFormDefaultValues(
    {presetValues, movie}: DefaultConfig = {}
): MovieFormStarterValues {
    const cleanedMovie = movie && {...movie, releaseDate: movie.releaseDate?.toFormat("yyyy-MM-dd")};

    const defaultValues: MovieFormStarterValues = {
        title: "",
        originalTitle: "",
        tagline: "",
        country: "",
        synopsis: "",
        releaseDate: "",
        isReleased: false,
        runtime: "",
        originalLanguage: "",
        trailerURL: "",
        languages: [],
        subtitles: [],
        genres: [],
        isAvailable: true,
        ...cleanedMovie,
        ...presetValues,
    };

    const heldValues = useRef<MovieFormStarterValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}