import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import useFetchShowingBySlug from "@/domains/showings/hooks/queries/useFetchShowingBySlug.ts";
import {ShowingDetailsSchema} from "@/domains/showings/schema/showing/Showing.schema.ts";
import ShowingInfoPageContent from "@/domains/showings/pages/browse/showing-info/ShowingInfoPageContent.tsx";
import {ShowingDetails} from "@/domains/showings/schema/showing/Showing.types.ts";

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

    const query = useFetchShowingBySlug({
        slug, config: {populate: true, virtuals: true}
    });

    return (
        <ValidatedDataLoader query={query} schema={ShowingDetailsSchema}>
            {(showing: ShowingDetails) => <ShowingInfoPageContent showing={showing}/>}
        </ValidatedDataLoader>
    );
};

export default ShowingInfoPage;
