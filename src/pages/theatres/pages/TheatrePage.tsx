import {FC} from 'react';
import useFetchTheatreParams from "@/pages/theatres/hooks/params/useFetchTheatreParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreDetailsHeader from "@/pages/theatres/components/headers/TheatreDetailsHeader.tsx";
import TheatreDetailsCard from "@/pages/theatres/components/TheatreDetailsCard.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import useFetchTheatreDetails from "@/pages/theatres/hooks/queries/useFetchTheatreDetails.ts";
import TheatreScreensPageSection from "@/pages/theatres/components/sections/TheatreScreensPageSection.tsx";

const TheatrePage: FC = () => {
    const {theatreID} = useFetchTheatreParams();
    const {
        theatre,
        paginatedScreens,
        paginatedShowings,
        isPending,
        isError,
        error
    } = useFetchTheatreDetails({theatreID: theatreID!, screen: {perPage: 6}});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    if (!theatre) {
        return <PageError header="404" message="Theatre Not Found!" to="/admin/theatres" linkText="Go To Index"/>;
    }

    const {items: screens} = paginatedScreens!;
    const {items: showings} = paginatedShowings!;

    return (
        <PageFlexWrapper>
            <TheatreDetailsHeader theatre={theatre!} />

            {/* Details */}

            <PageSection>
                <TheatreDetailsCard theatre={theatre!} />
            </PageSection>

            {/* Screens */}

            <TheatreScreensPageSection screens={screens} theatreID={theatre._id} />

            {/* Showings */}

            <PageSection title="Showings">
                {/* TODO Paginated Showings */}
                {showings.length}
            </PageSection>
        </PageFlexWrapper>
    );
};

export default TheatrePage;
