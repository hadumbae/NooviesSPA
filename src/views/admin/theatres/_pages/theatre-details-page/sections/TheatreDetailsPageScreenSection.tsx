/**
 * @fileoverview Renders the screen section on the Theatre Details page, including a form for adding new screens and pagination controls.
 */

import {ReactElement, useState} from "react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {TheatreScreenForm, TheatreScreenFormPanel} from "@/views/admin/theatre-screens/_feat/submit-data";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens/schema/model";
import {TheatreDetailsScreenListCard} from "@/views/admin/theatre-screens/_comp/theatre-details";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {Button} from "@/common/components/ui/button.tsx";
import {Plus} from "lucide-react";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

const panelInfo = {
    title: "Add Screen",
    description: "Add screen data for theatre.",
};

/** Props for the TheatreDetailsPageScreenSection component. */
type SectionProps = {
    theatreID: ObjectId;
    theatreSlug: SlugString;
    screens: TheatreScreenWithVirtuals[];
    totalScreens: number;
    page: number;
    perPage: number;
    setPage: (val: number) => void;
};

/** Renders the screen management section for the theatre details view. */
export function TheatreDetailsPageScreenSection(
    {theatreID, theatreSlug, screens, totalScreens, page, perPage, setPage}: SectionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onScreenCreate = () => setIsOpen(false);

    return (
        <section className='space-y-4'>
            <SROnly text="Theatre Screens"/>

            <div className="flex justify-between items-center">
                <PageSectionHeader text="Screens"/>
                <TheatreScreenForm presetValues={{theatre: theatreID}} onSubmitSuccess={onScreenCreate}>
                    <TheatreScreenFormPanel
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        disableFields={{theatre: true}}
                        {...panelInfo}
                    >
                        <Button size="sm" variant="link" className="link-button">
                            <Plus/> Add Screens
                        </Button>
                    </TheatreScreenFormPanel>
                </TheatreScreenForm>
            </div>

            {
                screens.length > 0 ? (
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
                ) : (
                    <EmptyArrayContainer
                        text="There Are No Screens"
                        className="border rounded-xl h-32"
                    />
                )
            }

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                setPage={setPage}
                totalItems={totalScreens}
            />
        </section>
    );
}