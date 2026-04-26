/**
 * @fileoverview Data-fetching card component that retrieves and displays a high-level overview of a theatre's metadata.
 */

import {ReactElement} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Loader} from "lucide-react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchTheatre from "@/domains/theatres/hooks/fetch-theatre/useFetchTheatre.ts";
import {TheatreDetails} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import {TheatreDetailsSchema} from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import {cn} from "@/common/lib/utils.ts";
import formatTheatreDetails from "@/domains/theatres/utilities/formatTheatreDetails.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/** Props for the TheatreQuickOverviewFetchCard component. */
export type FetchCardProps = {
    theatreID: ObjectId;
    className?: string;
};

/**
 * Fetches theatre data by ID and renders a summary card after validating the response against a Zod schema.
 */
export function TheatreQuickOverviewFetchCard(
    {theatreID, className}: FetchCardProps
): ReactElement {
    const query = useFetchTheatre({_id: theatreID, config: {populate: true, virtuals: true}});

    return (
        <ValidatedDataLoader query={query} schema={TheatreDetailsSchema} loaderComponent={Loader}>
            {(theatre: TheatreDetails) => {
                const {name} = theatre;
                const {address, details} = formatTheatreDetails(theatre);

                return (
                    <Card>
                        <CardContent className={cn(
                            "flex flex-col",
                            "space-y-2 p-3",
                            className,
                        )}>
                            <h1 className="text-sm font-bold">{name}</h1>
                            <h2 className="text-sm text-neutral-400">{details}</h2>
                            <h3 className="text-xs text-neutral-400">{address}</h3>
                        </CardContent>
                    </Card>
                );
            }}
        </ValidatedDataLoader>
    );
}