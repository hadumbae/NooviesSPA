/**
 * @fileoverview Form section for filtering movie showings by theatre and date on the movie info page.
 */

import {ReactElement} from "react";
import {ShowingsPageQueryStrings, ShowingsPageQueryStringSchema} from "@/domains/movies/_feat/client-view-data";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {DisableKeys} from "@/common/type/form/HookFormFieldTypes.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import TheatreShowingQueryFormContainer
    from "@/domains/showings/components/forms/theatre-showing-query/TheatreShowingQueryFormContainer.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";

/** Props for the MovieInfoShowingsPageFormSection component. */
type SectionProps = {
    defaultValues?: {
        near?: string;
        page?: number;
    };
};

/** Renders the search and filter form for movie showings with preset values from URL parameters. */
export function MovieInfoShowingsPageFormSection(
    {defaultValues = {page: 1}}: SectionProps
): ReactElement {
    const {searchParams: presetValues} = useParsedSearchParams({
        schema: ShowingsPageQueryStringSchema,
        defaultValues,
    });

    const disabledFields: DisableKeys<ShowingsPageQueryStrings> = [
        "page",
    ];

    return (
        <section>
            <SROnly text="Theatre Options"/>

            <Card>
                <CardContent className="p-2">
                    <TheatreShowingQueryFormContainer
                        disableFields={disabledFields}
                        presetValues={presetValues}
                    />
                </CardContent>
            </Card>
        </section>
    );
}