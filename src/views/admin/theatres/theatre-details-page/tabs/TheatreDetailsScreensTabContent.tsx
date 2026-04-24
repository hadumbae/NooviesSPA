/**
 * @fileoverview Tab content for managing and listing screens associated with a specific theatre.
 */

import {ReactElement} from 'react';
import {isArray} from "lodash";
import ScreenSubmitFormPanel from "@/views/admin/theatre-screens/components/submit-form/panel/ScreenSubmitFormPanel.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import {Plus} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import TheatreScreenDetailsDrawer
    from "@/views/admin/theatre-screens/components/theatre-screens/admin/lists/TheatreScreenDetailsDrawer.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {TheatreScreenDetails} from "@/domains/theatre-screens/schema/model";

/** Props for the TheatreDetailsScreensTabContent component. */
type TabContentProps = {
    theatreID: ObjectId;
    screens: TheatreScreenDetails[];
    totalItems: number;
    paginationOptions: {
        page: number;
        perPage: number;
        setPage: (val: number) => void;
    };
    classNames?: {
        container?: string;
        list?: string;
    };
}

const panelInfo = {
    title: "Add Screen",
    description: "Add screen data for theatre.",
};

/**
 * Renders a list of theatre screens with pagination support and an administrative
 * interface to register new screens.
 */
export function TheatreDetailsScreensTabContent(
    {totalItems, screens, classNames, paginationOptions}: TabContentProps
): ReactElement {
    const {page, perPage, setPage} = paginationOptions;
    const hasScreens = isArray(screens) && screens.length > 0;

    const formPanel = (
        <ScreenSubmitFormPanel {...panelInfo}>
            <Button size="sm" variant="link" className={HoverLinkCSS}>
                <Plus/> Add Screens
            </Button>
        </ScreenSubmitFormPanel>
    );

    /** Empty State Rendering */
    if (!hasScreens) {
        return (
            <div className={cn(
                "flex flex-col justify-center items-center space-y-8",
                classNames?.container
            )}>
                <span className="select-none text-neutral-400">No Registered Screens</span>
                {formPanel}
            </div>
        );
    }

    /** Populated State Rendering */
    return (
        <div className={cn("space-y-5", classNames?.container)}>
            <section className="flex justify-between items-center">
                <PrimaryHeaderText>Screens</PrimaryHeaderText>
                {formPanel}
            </section>

            <section className={cn("grid grid-cols-1 gap-3", classNames?.list)}>
                <SectionHeader srOnly>Screen list</SectionHeader>
                {screens.map((screen) => (
                    <TheatreScreenDetailsDrawer key={screen._id} screen={screen}/>
                ))}
            </section>

            {totalItems > perPage && (
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    setPage={setPage}
                    totalItems={totalItems}
                />
            )}
        </div>
    );
}