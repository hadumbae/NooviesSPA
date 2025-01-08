import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Plus} from "lucide-react";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import {useFetchPaginatedScreens} from "@/pages/screens/hooks/useFetchPaginatedScreens.ts";
import ScreenCardList from "@/pages/screens/components/ScreenCardList.tsx";

const ScreensPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedScreens({page, perPage});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    const {items: screens} = data;

    const onDelete = () => {
        refetch();
    }

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <div>
                    <HeaderTitle>Screens</HeaderTitle>
                    <HeaderDescription>The screens where the movies will be shown.</HeaderDescription>
                </div>

                <HeaderLink to="/admin/screens/create">
                    <Plus />
                </HeaderLink>
            </header>

            <section>
                <ScreenCardList screens={screens} onDelete={onDelete} />
            </section>
        </PageFlexWrapper>
    );
};

export default ScreensPage;
