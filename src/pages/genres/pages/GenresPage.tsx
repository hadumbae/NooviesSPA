import {FC} from 'react';
import useFetchPaginatedGenres from "@/pages/genres/hooks/useFetchPaginatedGenres.ts";
import usePaginationSearchParams from "@/common/hooks/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/HeaderDescription.tsx";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {Link} from "react-router-dom";
import {cn} from "@/common/lib/utils.ts";
import PageError from "@/common/components/page/PageError.tsx";
import GenreCardList from "@/pages/genres/components/GenreCardList.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";

const GenresPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedGenres({page, perPage, queries: {}});

    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />

    const {items: genres} = data;

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <div>
                    <HeaderTitle>Genres</HeaderTitle>
                    <HeaderDescription>The genres of the movies.</HeaderDescription>
                </div>

                <Link
                    className={cn(buttonVariants({variant: "outline"}), "p-2")}
                    to="/admin/genres/create"
                >
                    <Plus />
                </Link>
            </header>

            <section className="flex-1 space-y-3">
                <GenreCardList genres={genres} onGenreDelete={() => refetch()} />
            </section>
        </PageFlexWrapper>
    );
};

export default GenresPage;
