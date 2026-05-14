/** @fileoverview Card component for displaying comprehensive movie details including metadata, synopsis, and localization. */


import {ReactElement} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MovieDetailsCardMetaSection} from "@/views/admin/movies/_comp/details-display/MovieDetailsCardMetaSection.tsx";
import {
    MovieDetailsCardMultimediaSection
} from "@/views/admin/movies/_comp/details-display/MovieDetailsCardMultimediaSection.tsx";
import {
    MovieDetailsCardLanguageSection
} from "@/views/admin/movies/_comp/details-display/MovieDetailsCardLanguageSection.tsx";
import {
    MovieDetailsCardSynopsisSection
} from "@/views/admin/movies/_comp/details-display/MovieDetailsCardSynopsisSection.tsx";

/** Props for the MovieDetailsCard component. */
type CardProps = {
    movie: MovieDetails;
}

/**
 * Renders a structured card layout containing categorised movie information.
 */
export function MovieDetailsCard({movie}: CardProps): ReactElement {
    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <MovieDetailsCardMetaSection movie={movie}/>
                <MovieDetailsCardSynopsisSection movie={movie} />
                <MovieDetailsCardMultimediaSection movie={movie} />
                <MovieDetailsCardLanguageSection movie={movie} />
            </CardContent>
        </Card>
    );
}