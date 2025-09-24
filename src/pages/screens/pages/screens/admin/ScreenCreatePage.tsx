import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ScreenSubmitFormContainer from "@/pages/screens/components/submit-form/ScreenSubmitFormContainer.tsx";
import ScreenCreateHeader from "@/pages/screens/components/headers/ScreenCreateHeader.tsx";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";


const ScreenCreatePage: FC = () => {
    const navigate = useLoggedNavigate();

    const onSubmit = (screen: Screen) => {
        navigate({
            to: `/admin/screens/get/${screen._id}`,
            component: ScreenCreatePage.name,
            message: "Navigation on screen creation.",
        });
    }

    return (
        <PageFlexWrapper>
            <ScreenCreateHeader />

            <section>
                <ScreenSubmitFormContainer onSubmitSuccess={onSubmit} />
            </section>
        </PageFlexWrapper>
    );
};

export default ScreenCreatePage;
