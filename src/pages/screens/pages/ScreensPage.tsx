import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import {useFetchPaginatedScreens} from "@/pages/screens/hooks/useFetchPaginatedScreens.ts";
import ScreenCardList from "@/pages/screens/components/ScreenCardList.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import ScreenIndexHeader from "@/pages/screens/components/headers/ScreenIndexHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";

const ScreensPage: FC = () => {
    useTitle("Screens")

    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedScreens({page, perPage, populate: true});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    const onDelete = () => refetch();

    const {items: screens} = data;
    const hasScreens = (screens || []).length > 0;

    return (
        <PageFlexWrapper>
            <ScreenIndexHeader />

            {
                hasScreens
                    ? <PageSection>
                        <ScreenCardList screens={screens} onDelete={onDelete} />
                    </PageSection>
                    : <PageCenter>
                        <span className="text-neutral-400 select-none">There Are No Screens</span>
                    </PageCenter>
            }

        </PageFlexWrapper>
    );
};

export default ScreensPage;
