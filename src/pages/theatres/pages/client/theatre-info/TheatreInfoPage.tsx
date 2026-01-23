import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";

const TheatreInfoPage = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/theatres",
        errorMessage: "Invalid theatre.",
        sourceComponent: TheatreInfoPage.name,
    }) ?? {};

    if (!slug) {
        return <PageLoader />;
    }

    return (
        <div>
            Slug: {slug}
        </div>
    );
};

export default TheatreInfoPage;
