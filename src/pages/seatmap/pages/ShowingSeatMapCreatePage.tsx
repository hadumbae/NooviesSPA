import {FC} from 'react';
import useFetchShowingParams from "@/pages/showings/hooks/params/useFetchShowingParams.ts";
import useFetchShowing from "@/pages/showings/hooks/queries/useFetchShowing.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingSeatMapCreateHeader from "@/pages/seatmap/components/headers/ShowingSeatMapCreateHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import ShowingSeatMapSubmitForm from "@/pages/seatmap/components/forms/ShowingSeatMapSubmitForm.tsx";
import {useNavigate} from "react-router-dom";
import useShowingQueryErrorHandler from "@/pages/showings/hooks/errors/useShowingQueryErrorHandler.ts";
import {PopulatedShowing} from "@/pages/showings/schema/populated/ShowingPopulatedSchema.ts";

const ShowingSeatMapCreatePage: FC = () => {
    const navigate = useNavigate();

    const {showingID} = useFetchShowingParams();

    const {data: showing, isPending, isError, error} = useFetchShowing({_id: showingID});
    useShowingQueryErrorHandler(error);

    const onSubmit = () => navigate(`/admin/showings/get/${showing?._id}/seating`);

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    return (
        <PageFlexWrapper>
            <ShowingSeatMapCreateHeader showing={showing as PopulatedShowing} />

            <PageSection>
                <ShowingSeatMapSubmitForm
                    showing={showing!}
                    onSubmit={onSubmit}
                />
            </PageSection>

        </PageFlexWrapper>
    );
};

export default ShowingSeatMapCreatePage;
