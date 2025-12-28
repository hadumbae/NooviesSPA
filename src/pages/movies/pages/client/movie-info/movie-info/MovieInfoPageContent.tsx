import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";

type ContentProps = {
    movie: MovieDetails;
}

// --- Layout ---
//  - Header
//      - Headline (Title + Release Year + Runtime)
//      - Poster | (Genres + Synopsis)
//      - Directors, Writers, Stars
//  - Movie Details
//      - Title, Original Title
//      - Synopsis
//      - Tagline
//      - Genres
//  - Movie Credits
//      - Crew
//      - Cast
//      - Links
//  - Reviews
//      - Review Carousel
//      - Links
//  - Showings
//      - Recent Showings
//      - Links


const MovieInfoPageContent = ({movie}: ContentProps) => {
    const {_id: movieID, title, originalTitle, slug} = movie;

    // --- RENDER ---
    return (
        <PageFlexWrapper>
            <p>ID: {movieID}</p>
            <p>Title: {title}</p>
            <p>Original Title: {originalTitle}</p>

            <LoggedHoverLink to={`/browse/movies/${slug}/credits`}>
                Full Cast & Crew
            </LoggedHoverLink>

            <LoggedHoverLink to={`/browse/movies/${slug}/showings`}>
                Showings
            </LoggedHoverLink>
        </PageFlexWrapper>
    );
};

export default MovieInfoPageContent;
