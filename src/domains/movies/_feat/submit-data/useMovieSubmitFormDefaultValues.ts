/** @fileoverview Hook for computing and memoizing default values for the movie submission form. */

import {MovieFormValues} from "@/domains/movies/schema/form/MovieForm.types.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {useMemo, useRef} from "react";
import {isEqual} from "lodash";

/** Configuration parameters for determining initial form state. */
type DefaultConfig = {
    /** Optional partial overrides for the form. */
    presetValues?: Partial<MovieFormValues>;
    /** Optional existing movie document for editing. */
    movie?: Movie;
}

/**
 * Computes the default values for the movie form based on existing movie data and presets.
 */
export function useMovieSubmitFormDefaultValues(
    {presetValues, movie}: DefaultConfig = {}
): MovieFormValues {
    const heldValues = useRef<MovieFormValues | null>(null);

    const defaultValues = useMemo(() => ({
        title: "",
        originalTitle: "",
        tagline: "",
        country: "",
        synopsis: "",
        isReleased: false,
        runtime: "",
        originalLanguage: "",
        trailerURL: "",
        languages: [],
        subtitles: [],
        genres: [],
        isAvailable: true,
        ...movie,
        ...presetValues,
        releaseDate: presetValues?.releaseDate ?? movie?.releaseDate?.toFormat("yyyy-MM-dd") ?? "",
    }), [presetValues, movie]);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current ?? defaultValues;
}