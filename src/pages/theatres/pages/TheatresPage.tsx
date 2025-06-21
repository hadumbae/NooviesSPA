import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import TheatreIndexHeader from "@/pages/theatres/components/headers/TheatreIndexHeader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import useFetchTheatres from "@/pages/theatres/hooks/queries/query/fetch-by-query/useFetchTheatres.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {PaginatedTheatreSchema} from "@/pages/theatres/schema/TheatrePaginationSchema.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import TheatreListCard from "@/pages/theatres/components/TheatreListCard.tsx";

const TheatresPage: FC = () => {
    useTitle("Theatre Index")

    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error: queryError} = useFetchTheatres({paginated: true, page, perPage});
    const {data: paginatedTheatres, success, error: parseError} = useValidateData({
        isPending,
        data,
        schema: PaginatedTheatreSchema,
        message: "Invalid Theatre Data.",
    });

    if (isPending) return <PageLoader />;
    if (isError) return <PageHTTPError error={queryError} />;
    if (!success) return <PageParseError error={parseError} />;

    const {items: theatres} = paginatedTheatres;
    const hasTheatres = (theatres || []).length > 0;

    return (
        <PageFlexWrapper>
            <TheatreIndexHeader />

            {
                hasTheatres
                    ? <PageSection>
                        {theatres.map((theatre) => <TheatreListCard key={theatre._id} theatre={theatre} />)}
                    </PageSection>
                    : <PageCenter>
                        <span className="text-neutral-400 select-none">There Are No Theatres</span>
                    </PageCenter>
            }
        </PageFlexWrapper>
    );
};

export default TheatresPage;
