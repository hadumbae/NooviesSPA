/**
 * @fileoverview Data-fetching component for the "Screens" tab on the Theatre Details page.
 */

import {ReactElement} from "react";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import TheatreScreenDetailsDrawer
    from "@/views/admin/theatre-screens/components/theatre-screens/admin/lists/TheatreScreenDetailsDrawer.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import {Plus} from "lucide-react";
import ScreenSubmitFormPanel from "@/views/admin/theatre-screens/components/submit-form/panel/ScreenSubmitFormPanel.tsx";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens/schema/model";

const panelInfo = {
    title: "Add Screen",
    description: "Add screen data for theatre.",
};

/** Props for the TheatreDetailsScreensTab component. */
export type OverviewTabProps = {
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
    {screens, totalScreens, page, perPage, setPage}: OverviewTabProps
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

            <section className="grid grid-cols-1 gap-3">
                <SROnly text="Screen List"/>
                {screens.map((screen) => <TheatreScreenDetailsDrawer key={screen._id} screen={screen}/>)}
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