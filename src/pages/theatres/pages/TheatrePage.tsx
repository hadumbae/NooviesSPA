import {FC} from 'react';
import useFetchTheatre from "@/pages/theatres/hooks/useFetchTheatre.ts";
import useFetchTheatreParams from "@/pages/theatres/hooks/useFetchTheatreParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreDetailsHeader from "@/pages/theatres/components/headers/TheatreDetailsHeader.tsx";
import TheatreDetailsCard from "@/pages/theatres/components/TheatreDetailsCard.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";

const TheatrePage: FC = () => {
    const {theatreID} = useFetchTheatreParams();
    const {data: theatre, isPending, isError, error} = useFetchTheatre({_id: theatreID!});


    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />


    return (
        <PageFlexWrapper>
            <TheatreDetailsHeader theatre={theatre} />

            <section>
                <TheatreDetailsCard theatre={theatre} />
            </section>

            {/* TODO Paginated Screens, 10 Per Page */}
            <section>
                <HeaderTitle className="text-xl">Screens TODO</HeaderTitle>
            </section>

            {/* TODO Paginated Showings */}
            <section>
                <HeaderTitle className="text-xl">Showings TODO</HeaderTitle>
            </section>
        </PageFlexWrapper>
    );
};

export default TheatrePage;
