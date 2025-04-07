import {FC} from 'react';
import {useNavigate} from "react-router-dom";
import useFetchScreenParams from "@/pages/screens/hooks/useFetchScreenParams.ts";
import useFetchScreen from "@/pages/screens/hooks/useFetchScreen.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ScreenSubmitFormContainer from "@/pages/screens/components/forms/ScreenSubmitFormContainer.tsx";
import ScreenEditHeader from "@/pages/screens/components/headers/ScreenEditHeader.tsx";

const ScreenEditPage: FC = () => {
    const navigate = useNavigate();
    const {screenID} = useFetchScreenParams();
    const {data: screen, isPending, isError, error} = useFetchScreen({_id: screenID!});

    const onSubmit = () => {
        navigate(`/admin/screens/get/${screen && screen._id}`);
    }

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    return (
        <PageFlexWrapper>
            <ScreenEditHeader screen={screen} />

            <section>
                <ScreenSubmitFormContainer screen={screen} onSubmit={() => onSubmit()} />
            </section>
        </PageFlexWrapper>
    );
};

export default ScreenEditPage;
