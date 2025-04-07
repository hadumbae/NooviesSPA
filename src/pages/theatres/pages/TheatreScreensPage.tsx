import {FC} from 'react';
import {cn} from "@/common/lib/utils.ts";

import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";

import TheatreScreensIndexHeader from "@/pages/theatres/components/headers/TheatreScreensIndexHeader.tsx";
import TheatreScreenCardList from "@/pages/theatres/components/screens/TheatreScreenCardList.tsx";

import useFetchTheatreParams from "@/pages/theatres/hooks/params/useFetchTheatreParams.ts";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import useFetchTheatreAndScreens from "@/pages/theatres/hooks/queries/useFetchTheatreAndScreens.ts";

const TheatreScreensPage: FC = () => {
    const { theatreID } = useFetchTheatreParams();
    const {page, perPage} = usePaginationSearchParams({perPage: "10"});

    const {theatre, screens, isPending, isError, error, refetchScreens} = useFetchTheatreAndScreens({
        page, perPage,
        theatreID: theatreID!,
        populate: true
    });

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    const onScreenAdd = () => {
        refetchScreens();
    }

    return (
        <PageFlexWrapper>
            <TheatreScreensIndexHeader theatre={theatre!} onScreenSubmit={onScreenAdd} />

            <PageSection title="Screens" className={cn("")}>
                <div className="grid grid-cols-1 gap-3">
                    <TheatreScreenCardList screens={screens!} />
                </div>
            </PageSection>

        </PageFlexWrapper>
    );
};

export default TheatreScreensPage;
