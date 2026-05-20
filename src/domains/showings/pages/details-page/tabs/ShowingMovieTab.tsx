/**
 * @fileoverview Admin tab displaying a movie overview with its recent Showings.
 *
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import ShowingMovieCard from "@/domains/showings/components/admin/card/showing-movie-card/ShowingMovieCard.tsx";
import {
    ShowingSummaryCardList
} from "@/domains/showings/components/admin/card/showing-summary-card/ShowingSummaryCardList.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {ReactElement} from "react";
import {useFetchMovie} from "@/domains/movies/_feat/crud-hooks";
import {useFetchShowings} from "@/domains/showings/_feat/crud-hooks";

/** Combined query result shape for the ShowingMovieTab component. */
type QueryParams = {
    movie: MovieDetails;
    showings: ShowingDetails[];
};

/** Props for the ShowingMovieTab component. */
type TabProps = {
    movieID: ObjectId;
};

/**
 * Renders an admin tab showing a movie summary and its latest Showings.
 */
export function ShowingMovieTab({movieID}: TabProps): ReactElement {
    const movieQuery = useFetchMovie({
        _id: movieID,
        config: {populate: true, virtuals: true},
        schema: MovieDetailsSchema,
    });

    const showingQuery = useFetchShowings({
        queries: {movie: movieID, sortByStartTime: -1},
        config: {populate: true, virtuals: true, limit: 10},
        schema: generateArraySchema(ShowingDetailsSchema),
    });

    const queries = [movieQuery, showingQuery];

    const queryValidation: CombinedSchemaQuery[] = [
        {query: movieQuery, schema: MovieDetailsSchema, key: "movie"},
        {query: showingQuery, schema: generateArraySchema(ShowingDetailsSchema), key: "showings"},
    ];

    return (
        <CombinedQueryBoundary queries={queries}>
            <CombinedValidatedQueryBoundary queries={queryValidation}>
                {(data: unknown) => {
                    const {movie, showings} = data as QueryParams;

                    return (
                        <div className="flex flex-col space-y-4">
                            <section className="space-y-2">
                                <SectionHeader>Movie</SectionHeader>
                                <ShowingMovieCard movie={movie}/>
                            </section>

                            <section className="space-y-2">
                                <SectionHeader>Recent Showings</SectionHeader>
                                <ShowingSummaryCardList showings={showings}/>
                            </section>
                        </div>
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
}


