import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/HeaderLink.tsx";
import {Plus} from "lucide-react";
import TheatreCardList from "@/pages/theatres/components/TheatreCardList.tsx";
import usePaginationSearchParams from "@/common/hooks/usePaginationSearchParams.ts";
import {useFetchPaginatedTheatres} from "@/pages/theatres/hooks/useFetchPaginatedTheatres.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";

const TheatresPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedTheatres({page, perPage});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    const {items: theatres} = data;

    const onDelete = () => {
        refetch();
    }

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <div>
                    <HeaderTitle>Theatres</HeaderTitle>
                    <HeaderDescription>The theatres where the movies will be shown.</HeaderDescription>
                </div>

                <HeaderLink to="/admin/theatres/create">
                    <Plus />
                </HeaderLink>
            </header>

            <section className="space-y-4">
                <TheatreCardList theatres={theatres} onDelete={onDelete} />
            </section>
        </PageFlexWrapper>
    );
};

export default TheatresPage;
