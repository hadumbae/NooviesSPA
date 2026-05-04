/**
 * @fileoverview Fetches and renders a validated list of showings as summary cards.
 */

import useFetchShowings from "@/domains/showings/hooks/queries/useFetchShowings.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

import {ShowingQueryOptions} from "../../../schema/queries/ShowingQueryOptionSchema";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {ReactElement} from "react";
import {cn} from "@/common/lib/utils.ts";
import {ShowingSummaryCard} from "@/domains/showings/components/admin/card/showing-summary-card/ShowingSummaryCard.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

/** Props for the ShowingSummaryListQuery component. */
type ListProps = ShowingQueryOptions & Pick<RequestOptions, "limit">;

/** Executes a showing query and renders the result as a summary card list. */
export function ShowingSummaryListQuery(props: ListProps): ReactElement {
    const {limit, ...queries} = props;

    const query = useFetchShowings({
        queries,
        config: {virtuals: true, populate: true, limit},
    });

    return (
        <ValidatedDataLoader query={query} schema={generateArraySchema(ShowingDetailsSchema)}>
            {(showings: ShowingDetails[]) => {
                if (showings.length === 0) {
                    return (
                        <EmptyArrayContainer
                            className="h-28"
                            text="There Are No Showings"
                        />
                    );
                }

                return (
                    <div className={cn("grid grid-cols-1 gap-2")}>
                        {showings.map((showing) => (
                            <ShowingSummaryCard key={showing._id} showing={showing}/>
                        ))}
                    </div>
                );
            }}
        </ValidatedDataLoader>
    );
}