/**
 * @fileoverview Form section for filtering movie showings by theatre and date on the movie info page.
 */

import {ReactElement} from "react";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {SROnly} from "@/views/common/_comp/screen-readers";

import {ShowingsPageQueryStrings, ShowingsPageQueryStringSchema} from "@/domains/movies";
import {TheatreShowingQueryForm, TheatreShowingQueryFormView} from "@/views/client/showings";

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