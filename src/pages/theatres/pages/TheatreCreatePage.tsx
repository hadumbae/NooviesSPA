import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {TableOfContents} from "lucide-react";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {useNavigate} from "react-router-dom";
import TheatreSubmitForm from "@/pages/theatres/components/TheatreSubmitForm.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

const TheatreCreatePage: FC = () => {
    const navigate = useNavigate();
    const onSubmit = (theatre: TheatreDetails) => {
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
