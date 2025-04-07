import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ScreenSubmitFormContainer from "@/pages/screens/components/forms/ScreenSubmitFormContainer.tsx";
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import {useNavigate} from "react-router-dom";
import ScreenCreateHeader from "@/pages/screens/components/headers/ScreenCreateHeader.tsx";


const ScreenCreatePage: FC = () => {
    const navigate = useNavigate();
    const onSubmit = (screen: Screen) => {
        navigate(`/admin/screens/get/${screen._id}`);
    }

    return (
        <PageFlexWrapper>
            <ScreenCreateHeader />

            <section>
                <ScreenSubmitFormContainer onSubmit={onSubmit} />
            </section>
        </PageFlexWrapper>
    );
};

export default ScreenCreatePage;
