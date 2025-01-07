import {FC} from 'react';
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/HeaderLink.tsx";
import {TableOfContents} from "lucide-react";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {useNavigate} from "react-router-dom";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import TheatreSubmitForm from "@/pages/theatres/components/TheatreSubmitForm.tsx";

const TheatreCreatePage: FC = () => {
    const navigate = useNavigate();
    const onSubmit = (theatre: Theatre) => {
        navigate(`/admin/theatres/get/${theatre._id}`);
    }

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <div>
                    <HeaderTitle>Create Theatre</HeaderTitle>
                    <HeaderDescription>Enter details and press on `Submit` to create theatres.</HeaderDescription>
                </div>

                <HeaderLink to="/admin/theatres">
                    <TableOfContents />
                </HeaderLink>
            </header>

            <section>
                <TheatreSubmitForm onSubmit={onSubmit} />
            </section>
        </PageFlexWrapper>
    );
};

export default TheatreCreatePage;
