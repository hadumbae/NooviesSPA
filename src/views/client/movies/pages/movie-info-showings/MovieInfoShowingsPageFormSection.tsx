/**
 * @fileoverview Form section for filtering movie showings by theatre and date on the movie info page.
 */

import {ReactElement} from "react";
import {ShowingsPageQueryStrings, ShowingsPageQueryStringSchema} from "@/domains/movies/_feat/client-view-data";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {
    TheatreShowingQueryForm,
    TheatreShowingQueryFormView
} from "@/views/client/showings/_feat/submit-theatre-showing-query-form";

/** Props for the MovieInfoShowingsPageFormSection component. */
type SectionProps = {
    defaultValues?: Partial<ShowingsPageQueryStrings>;
};

/** Renders the search and filter form for movie showings with preset values from URL parameters. */
export function MovieInfoShowingsPageFormSection(
    {defaultValues = {page: 1}}: SectionProps
): ReactElement {
    const {searchParams: presetValues} = useParsedSearchParams({
        schema: ShowingsPageQueryStringSchema,
        defaultValues,
    });

    return (
        <section>
            <SROnly text="Theatre Options"/>

            <Card>
                <CardContent className="p-2">
                    <TheatreShowingQueryForm presetValues={presetValues}>
                        <TheatreShowingQueryFormView disableFields={{page: true}}/>
                    </TheatreShowingQueryForm>
                </CardContent>
            </Card>
        </section>
    );
}