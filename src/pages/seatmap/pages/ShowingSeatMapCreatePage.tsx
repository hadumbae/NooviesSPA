import {FC} from 'react';
import useFetchShowingParams from "@/pages/showings/hooks/params/useFetchShowingParams.ts";
import useFetchShowing from "@/pages/showings/hooks/queries/useFetchShowing.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingSeatMapCreateHeader from "@/pages/seatmap/components/headers/ShowingSeatMapCreateHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import ShowingSeatMapSubmitForm from "@/pages/seatmap/components/forms/ShowingSeatMapSubmitForm.tsx";

const ShowingSeatMapCreatePage: FC = () => {
    const {showingID} = useFetchShowingParams();
    const {data: showing, isPending, isError, error} = useFetchShowing({_id: showingID});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    return (
        <PageFlexWrapper>
            <ShowingSeatMapCreateHeader showing={showing} />

            <PageSection>
                <ShowingSeatMapSubmitForm showing={showing} />
            </PageSection>

        </PageFlexWrapper>
    );
};

export default ShowingSeatMapCreatePage;
