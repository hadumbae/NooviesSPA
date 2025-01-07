import {FC} from 'react';
import {useNavigate} from "react-router-dom";
import useFetchTheatreParams from "@/pages/theatres/hooks/useFetchTheatreParams.ts";
import useFetchTheatre from "@/pages/theatres/hooks/useFetchTheatre.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/HeaderDescription.tsx";
import TheatreSubmitForm from "@/pages/theatres/components/TheatreSubmitForm.tsx";

const TheatreEditPage: FC = () => {
    const navigate = useNavigate();
    const {theatreID} = useFetchTheatreParams();

    const {data: theatre, isPending, isError, error} = useFetchTheatre({_id: theatreID!});

    const onSubmit = () => {
        navigate(`/admin/theatres/get/${theatre && theatre._id}`);
    }

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    const {name} = theatre;

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>
                    Edit the theatre ({name}) here. Click on 'Submit' to proceed.
                </HeaderDescription>
            </header>

            <section>
                <TheatreSubmitForm theatre={theatre} onSubmit={() => onSubmit()} />
            </section>
        </PageFlexWrapper>
    );
};

export default TheatreEditPage;
