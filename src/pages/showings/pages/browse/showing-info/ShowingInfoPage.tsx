import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";

const ShowingInfoPage = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        sourceComponent: ShowingInfoPage.name,
        errorTo: "/",
        errorMessage: "Invalid Showing.",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <div>
            Hello! {slug}
        </div>
    );
};

export default ShowingInfoPage;
