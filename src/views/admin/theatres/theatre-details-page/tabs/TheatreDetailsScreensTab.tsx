/**
 * @fileoverview Data-fetching component for the "Screens" tab on the Theatre Details page.
 */

import { ReactElement } from "react";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { ScreenQueryOptions } from "@/domains/theatre-screens/schema/queries/ScreenQueryOptions.types.ts";
import useFetchPaginatedScreens
    from "@/domains/theatre-screens/hooks/screens/fetch-screens/useFetchPaginatedScreens.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    TheatreDetailsScreensTabContent
} from "@/views/admin/theatres/theatre-details-page/tabs/TheatreDetailsScreensTabContent.tsx";
import {
    PaginatedTheatreScreenDetails,
    PaginatedTheatreScreenDetailsSchema
} from "@/domains/theatre-screens/schema/model/PaginatedTheatreScreenDetailsSchema.ts";

/** Props for the TheatreDetailsScreensTab component. */
export type OverviewTabProps = {
    theatreID: ObjectId;
    page: number;
    perPage: number;
    setPage: (val: number) => void;
    queries?: ScreenQueryOptions;
    classNames?: {
        container?: string;
        list?: string;
    };
};

/**
 * Manages the paginated fetch and validation of theatre screens.
 * Wraps the content in a ValidatedDataLoader to ensure the API response matches the PaginatedTheatreScreenDetailsSchema.
 */
export function TheatreDetailsScreensTab(
    { theatreID, page, perPage, setPage, classNames, queries }: OverviewTabProps
): ReactElement {
    const screenQuery = useFetchPaginatedScreens({
        page,
        perPage,
        config: { populate: true, virtuals: true },
        queries: { ...queries, theatre: theatreID },
    });

    return (
        <ValidatedDataLoader
            query={screenQuery}
            schema={PaginatedTheatreScreenDetailsSchema}
        >
            {({ items, totalItems }: PaginatedTheatreScreenDetails) => (
                <TheatreDetailsScreensTabContent
                    theatreID={theatreID}
                    screens={items}
                    totalItems={totalItems}
                    paginationOptions={{ page, perPage, setPage }}
                    classNames={classNames}
                />
            )}
        </ValidatedDataLoader>
    );
}