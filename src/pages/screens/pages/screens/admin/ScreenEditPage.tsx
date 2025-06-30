import {FC} from 'react';
import {useNavigate} from "react-router-dom";
import useFetchScreenParams from "@/pages/screens/hooks/screens/params/useFetchScreenParams.ts";
import useFetchScreen from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreen.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ScreenSubmitFormContainer from "@/pages/screens/components/forms/ScreenSubmitFormContainer.tsx";
import ScreenEditHeader from "@/pages/screens/components/headers/ScreenEditHeader.tsx";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";

const ScreenEditPage: FC = () => {
    const navigate = useNavigate();
    const {screenID} = useFetchScreenParams();
    const {data, isPending, isError, error: queryError} = useFetchScreen({_id: screenID!});
    const {success, data: screen, error: parseError} = useValidateData({
        data,
        isPending,
        schema: ScreenSchema,
        message: "Invalid Screen Data."
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!success) return <PageHTTPError error={parseError}/>;

    const onSubmit = () => {
        navigate(`/admin/screens/get/${screen && screen._id}`);
    }

    return (
        <PageFlexWrapper>
            <ScreenEditHeader screen={screen}/>

            <section>
                <ScreenSubmitFormContainer
                    isEditing={true}
                    screen={screen}
                    onSubmitSuccess={() => onSubmit()}
                />
            </section>
        </PageFlexWrapper>
    );
};

export default ScreenEditPage;
