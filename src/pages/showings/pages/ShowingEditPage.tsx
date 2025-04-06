import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingEditHeader from "@/pages/showings/components/headers/ShowingEditHeader.tsx";
import useFetchShowingParams from "@/pages/showings/hooks/params/useFetchShowingParams.ts";
import useFetchShowing from "@/pages/showings/hooks/queries/useFetchShowing.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import {useNavigate} from "react-router-dom";
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import ShowingSubmitForm from "@/pages/showings/components/ShowingSubmitForm.tsx";

const ShowingEditPage: FC = () => {
    const navigate = useNavigate();
    const {showingID} = useFetchShowingParams();
    const {data: showing, isPending, isError, error} = useFetchShowing({_id: showingID!});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    const onSubmit = (showing: Showing) => {
        navigate(`/admin/showings/get/${showing._id}`);
    }

    return (
        <PageFlexWrapper>
            <ShowingEditHeader showing={showing} />
            <ShowingSubmitForm onSubmit={onSubmit} showing={showing} />
        </PageFlexWrapper>
    );
};

export default ShowingEditPage;
