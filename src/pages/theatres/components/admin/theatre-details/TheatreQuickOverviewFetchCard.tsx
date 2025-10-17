import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Loader} from "lucide-react";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {cn} from "@/common/lib/utils.ts";
import formatTheatreDetails from "@/pages/theatres/utilities/formatTheatreDetails.ts";

/**
 * Props for {@link TheatreQuickOverviewFetchCard}.
 */
export type FetchCardProps = {
    /** The unique ObjectId of the theatre to fetch and display. */
    theatreID: ObjectId;
    /** Optional additional class names for layout or styling. */
    className?: string;
};

/**
 * Displays a concise overview of a theatre’s details (name, address, and description)
 * within a styled card component.
 *
 * This component is designed as a **data-fetching boundary** that:
 * - Uses {@link useFetchTheatre} to retrieve full theatre information by ID.
 * - Wraps the fetch operation in {@link QueryBoundary} and {@link ValidatedQueryBoundary}
 *   for automatic loading, validation, and error-handling.
 * - Validates the response against {@link TheatreDetailsSchema} before rendering.
 *
 * The displayed information includes:
 * - Theatre name
 * - A brief details line (formatted via {@link formatTheatreDetails})
 * - Theatre address
 *
 * @example
 * ```tsx
 * <TheatreQuickOverviewFetchCard theatreID="653a18b05f..." className="mt-2" />
 * ```
 *
 * @remarks
 * The `QueryBoundary` handles query state (`loading`, `error`, `success`),
 * while the `ValidatedQueryBoundary` ensures that the fetched data conforms
 * to the expected schema before rendering.
 * This ensures robust runtime safety and user-friendly fallback states.
 */
const TheatreQuickOverviewFetchCard: FC<FetchCardProps> = ({theatreID, className}) => {
    const query = useFetchTheatre({_id: theatreID, populate: true, virtuals: true});

    return (
        <QueryBoundary
            query={query}
            loaderComponent={Loader}
            errorComponent={ErrorMessageDisplay}
        >
            <ValidatedQueryBoundary
                query={query}
                schema={TheatreDetailsSchema}
                loaderComponent={Loader}
                errorComponent={ErrorMessageDisplay}
            >
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
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreQuickOverviewFetchCard;
