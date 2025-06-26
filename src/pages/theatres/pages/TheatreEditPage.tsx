import {FC} from 'react';
import {useNavigate} from "react-router-dom";
import useFetchTheatreParams from "@/pages/theatres/hooks/params/useFetchTheatreParams.ts";
import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreSubmitFormContainer from "@/pages/theatres/components/forms/TheatreSubmitFormContainer.tsx";
import TheatreEditHeader from "@/pages/theatres/components/headers/TheatreEditHeader.tsx";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {TheatreSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import TheatreEditBreadcrumbs from "@/pages/theatres/components/breadcrumbs/admin/TheatreEditBreadcrumbs.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";

const TheatreEditPage: FC = () => {
    const navigate = useNavigate();
    const {theatreID} = useFetchTheatreParams();

    const {data, isPending, isError, error: queryError} = useFetchTheatre({_id: theatreID!});
    const {success, data: theatre, error: parseError} = useValidateData({
        data,
        isPending,
        schema: TheatreSchema,
        message: "Invalid TheatreData."
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>
    if (!success) return <PageParseError error={parseError}/>

    const {_id, name} = theatre;

    const onSubmit = () => {
        navigate(`/admin/theatres/get/${_id}`);
    }

    return (
        <PageFlexWrapper>
            <TheatreEditBreadcrumbs theatreID={_id} theatreName={name} />
            <TheatreEditHeader theatre={theatre}/>

            <PageSection srTitle="Theatre Edit Form">
                <Card>
                    <CardContent className="p-4">
                        <TheatreSubmitFormContainer
                            isEditing={true}
                            theatre={theatre}
                            onSubmitSuccess={onSubmit}
                        />
                    </CardContent>
                </Card>
            </PageSection>
        </PageFlexWrapper>
    );
};

export default TheatreEditPage;
