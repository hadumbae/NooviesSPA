/**
 * @fileoverview Data-fetching card component that retrieves and displays a high-level overview of a theatre's metadata.
 */

import {ReactElement} from 'react';
import {Card, CardContent} from "@/views/common/_comp/ui/card.tsx";
import {Loader} from "lucide-react";
import {ObjectId} from "@/common/_schemas";
import {cn} from "@/common/_feat";
import {TheatreDetails, TheatreDetailsSchema} from "@/domains/theatres/_schema/theatre/TheatreDetailsSchema.ts";
import {useFetchTheatre} from "@/domains/theatres/_feat/crud-hooks";
import {QueryDataLoader} from "@/views/common/_feat";
import {formatTheatreDetails} from "@/domains/theatres/_feat/formatters";

/** Props for the TheatreQuickOverviewFetchCard component. */
export type FetchCardProps = {
    theatreID: ObjectId;
    className?: string;
};

/**
 * Fetches theatre data by ID and renders a summary card after validating the response against a Zod schema.
 */
export function TheatreQuickOverviewFetchCard({theatreID, className}: FetchCardProps): ReactElement {
    const query = useFetchTheatre({
        schema: TheatreDetailsSchema,
        _id: theatreID,
        config: {populate: true, virtuals: true}
    });

    return (
        <QueryDataLoader query={query} loaderComponent={Loader}>
            {(theatre: TheatreDetails) => {
                const {name} = theatre;
                const {formatted: {address, details}} = formatTheatreDetails(theatre);

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
        </QueryDataLoader>
    );
}