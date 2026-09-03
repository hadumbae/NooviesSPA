/**
 * @fileoverview Client page for displaying theatre details and available screens with showings.
 */

import {ReactElement} from "react";
import {
    useFetchByIdentifierRouteParams, useSetPageTitle
} from "@/common/_feat";
import {SlugRouteParamSchema} from "@/common/_schemas/route/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import {QueryDataLoader} from "@/views/common/_feat";

import {useFetchTheatreInfoViewData, useTheatreInfoQueryOptionsContext} from "@/domains/theatres/_feat";
import {TheatreInfoPageContent} from "@/views/client/theatres/_pages/theatre-info/content.tsx";

/**
 * Theatre information page.
 */
export function TheatreInfoPage(): ReactElement {
    const {setTitle} = useSetPageTitle({presetTitle: "Theatre Info"});

    const {slug: theatreSlug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/theatres",
        errorMessage: "Invalid theatre.",
        sourceComponent: TheatreInfoPage.name,
    }) ?? {};

    const {values: {date}} = useTheatreInfoQueryOptionsContext();

    const query = useFetchTheatreInfoViewData({
        theatreSlug: theatreSlug!,
        localDateString: date,
        queries: {limit: 3},
        options: {enabled: !!theatreSlug}
    });

    if (!theatreSlug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {({theatre, screens}) => (
                <TheatreInfoPageContent
                    theatre={theatre}
                    screens={screens}
                    localDate={date}
                    setPageTitle={setTitle}
                />
            )}
        </QueryDataLoader>
    );
}