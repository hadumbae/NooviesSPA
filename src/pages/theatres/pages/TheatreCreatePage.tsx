import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {useNavigate} from "react-router-dom";
import TheatreSubmitFormContainer from "@/pages/theatres/components/theatre-submit-form/TheatreSubmitFormContainer.tsx";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import TheatreCreateHeader from "@/pages/theatres/components/headers/TheatreCreateHeader.tsx";
import TheatreCreateBreadcrumbs from "@/pages/theatres/components/breadcrumbs/admin/TheatreCreateBreadcrumbs.tsx";

const TheatreCreatePage: FC = () => {
    const navigate = useNavigate();

    const onSubmit = (theatre: Theatre) => {
        navigate(`/admin/theatres/get/${theatre._id}`);
    }

    return (
        <PageFlexWrapper>
            <TheatreCreateBreadcrumbs />
            <TheatreCreateHeader />

            <PageSection srTitle="Theatre Create Form">
                <Card>
                    <CardContent className="p-4">
                        <TheatreSubmitFormContainer onSubmitSuccess={onSubmit} />
                    </CardContent>
                </Card>
            </PageSection>
        </PageFlexWrapper>
    );
};

export default TheatreCreatePage;
