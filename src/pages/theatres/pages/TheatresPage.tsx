import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import TheatreIndexHeader from "@/pages/theatres/components/headers/TheatreIndexHeader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import useFetchTheatres from "@/pages/theatres/hooks/queries/query/fetch-by-query/useFetchTheatres.ts";
import TheatreIndexCard from "@/pages/theatres/components/index-page/TheatreIndexCard.tsx";
import {PaginatedTheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {PaginatedTheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

const TheatresPage: FC = () => {
    useTitle("Theatre Index")

    const {page, perPage} = usePaginationSearchParams();
    const query = useFetchTheatres({
        virtuals: true,
        populate: true,
        paginated: true,
        page,
        perPage,
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedTheatreDetailsSchema}>
                {(paginatedTheatres: PaginatedTheatreDetails) => {
                    const {items: theatres} = paginatedTheatres;
                    const hasTheatres = (theatres || []).length > 0;

                    const hasTheatreSection = (
                        <PageSection className="grid grid-cols-1 gap-4">
                            {theatres.map((theatre) => <TheatreIndexCard key={theatre._id} theatre={theatre}/>)}
                        </PageSection>
                    );

                    const hasNoTheatreSection = (
                        <PageCenter>
                            <span className="text-neutral-400 select-none">There Are No Theatres</span>
                        </PageCenter>
                    );

                    return (
                        <PageFlexWrapper>
                            <TheatreIndexHeader/>
                            {hasTheatres ? hasTheatreSection : hasNoTheatreSection}
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatresPage;