/**
 * @fileoverview Data-fetching component for the "Screens" tab on the Theatre Details page.
 */

import {ReactElement} from "react";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import {Plus} from "lucide-react";
import ScreenSubmitFormPanel from "@/views/admin/theatre-screens/components/submit-form/panel/ScreenSubmitFormPanel.tsx";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens/schema/model";
import {TheatreDetailsScreenListCard} from "@/views/admin/theatre-screens/_comp/theatre-details";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

const panelInfo = {
    title: "Add Screen",
    description: "Add screen data for theatre.",
};

/** Props for the TheatreDetailsScreensTab component. */
export type OverviewTabProps = {
    theatreSlug: SlugString;
    screens: TheatreScreenWithVirtuals[];
    totalScreens: number;
    page: number;
    perPage: number;
    setPage: (val: number) => void;
};

/**
 * Manages the paginated fetch and validation of theatre screens.
 * Wraps the content in a ValidatedDataLoader to ensure the API response matches the PaginatedTheatreScreenDetailsSchema.
 */
export function TheatreDetailsScreensTab(
    {theatreSlug, screens, totalScreens, page, perPage, setPage}: OverviewTabProps
): ReactElement {
    return (
        <TabsContent value="screens" className="h-full space-y-5">
            <section className="flex justify-between items-center">
                <PageSectionHeader text="Screens"/>
                <ScreenSubmitFormPanel {...panelInfo}>
                    <Button size="sm" variant="link" className={HoverLinkCSS}>
                        <Plus/> Add Screens
                    </Button>
                </ScreenSubmitFormPanel>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <SROnly text="Screen List"/>
                {
                    screens.map((screen) => (
                        <TheatreDetailsScreenListCard
                            key={screen._id}
                            screen={screen}
                            theatreSlug={theatreSlug}
                        />
                    ))
                }
            </section>

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                setPage={setPage}
                totalItems={totalScreens}
            />
        </TabsContent>
    );
}