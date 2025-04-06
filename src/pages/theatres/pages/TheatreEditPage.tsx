import {FC} from 'react';
import {useNavigate} from "react-router-dom";
import useFetchTheatreParams from "@/pages/theatres/hooks/params/useFetchTheatreParams.ts";
import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreSubmitForm from "@/pages/theatres/components/TheatreSubmitForm.tsx";
import TheatreEditHeader from "@/pages/theatres/components/headers/TheatreEditHeader.tsx";

const TheatreEditPage: FC = () => {
    const navigate = useNavigate();
    const {theatreID} = useFetchTheatreParams();

    const {data: theatre, isPending, isError, error} = useFetchTheatre({_id: theatreID!});

    const onSubmit = () => {
        navigate(`/admin/theatres/get/${theatre && theatre._id}`);
    }

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    return (
        <PageFlexWrapper>
            <TheatreEditHeader theatre={theatre} />

            <section>
                <TheatreSubmitForm theatre={theatre} onSubmit={() => onSubmit()} />
            </section>
        </PageFlexWrapper>
    );
};

export default TheatreEditPage;
