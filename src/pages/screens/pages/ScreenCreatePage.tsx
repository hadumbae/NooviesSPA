import {FC} from 'react';
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/HeaderLink.tsx";
import {TableOfContents} from "lucide-react";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ScreenSubmitForm from "@/pages/screens/components/ScreenSubmitForm.tsx";
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import {useNavigate} from "react-router-dom";


const ScreenCreatePage: FC = () => {
    const navigate = useNavigate();
    const onSubmit = (screen: Screen) => {
        navigate(`/admin/screens/get/${screen._id}`);
    }

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <div>
                    <HeaderTitle>Create Screen</HeaderTitle>
                    <HeaderDescription>Enter details and press on `Submit` to create screens.</HeaderDescription>
                </div>

                <HeaderLink to="/admin/screens">
                    <TableOfContents />
                </HeaderLink>
            </header>

            <section>
                <ScreenSubmitForm onSubmit={onSubmit} />
            </section>
        </PageFlexWrapper>
    );
};

export default ScreenCreatePage;
