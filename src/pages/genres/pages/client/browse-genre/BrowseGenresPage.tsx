import useFetchGenres from "@/pages/genres/hooks/fetch-data/useFetchGenres.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {GenreArraySchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";

const BrowseGenresPage = () => {
    const query = useFetchGenres({
        requestOptions: {populate: false, virtuals: false}
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={GenreArraySchema}>
                {(genres: Genre[]) => {
                    console.log("Genres: ", genres);

                    return (
                        <PageFlexWrapper>
                            {genres.length} Genres
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default BrowseGenresPage;
