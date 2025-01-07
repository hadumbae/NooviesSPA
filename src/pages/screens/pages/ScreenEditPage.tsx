import {FC} from 'react';
import {useNavigate} from "react-router-dom";
import useFetchScreenParams from "@/pages/screens/hooks/useFetchScreenParams.ts";
import useFetchScreen from "@/pages/screens/hooks/useFetchScreen.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/HeaderDescription.tsx";
import ScreenSubmitForm from "@/pages/screens/components/ScreenSubmitForm.tsx";

const ScreenEditPage: FC = () => {
    const navigate = useNavigate();
    const {screenID} = useFetchScreenParams();
    const {data: screen, isPending, isError, error} = useFetchScreen({_id: screenID!});

    const onSubmit = () => {
        navigate(`/admin/screens/get/${screen && screen._id}`);
    }

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    const {name} = screen;
    
    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>
                    Edit the screen ({name}) here. Click on 'Submit' to proceed.
                </HeaderDescription>
            </header>

            <section>
                <ScreenSubmitForm screen={screen} onSubmit={() => onSubmit()} />
            </section>
        </PageFlexWrapper>
    );
};

export default ScreenEditPage;
