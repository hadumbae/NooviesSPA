/**
 * @file TheatreDetailsScreensTabContent.tsx
 * @description
 * React component rendering the content of the "Screens" tab for a theatre.
 *
 * Features:
 * - Displays a list of screens for a theatre using `TheatreScreenDetailsDrawer`.
 * - Shows a form panel to add new screens via `ScreenSubmitFormPanel`.
 * - Handles empty states with a friendly message when no screens are registered.
 * - Includes pagination controls if total items exceed `perPage`.
 * - Supports optional container and list CSS class overrides.
 *
 * @example
 * ```tsx
 * <TheatreDetailsScreensTabContent
 *   theatreID="64f123abc1234567890abcdef"
 *   screens={screensArray}
 *   totalItems={screensArray.length}
 *   paginationOptions={{ page: 1, perPage: 10, setPage }}
 *   classNames={{ container: "custom-container", list: "custom-list" }}
 * />
 * ```
 */

import { FC } from 'react';
import { isArray } from "lodash";
import { ScreenFormValues } from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import ScreenSubmitFormPanel from "@/pages/screens/components/submit-form/panel/ScreenSubmitFormPanel.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import { HoverLinkCSS } from "@/common/constants/css/ButtonCSS.ts";
import { Plus } from "lucide-react";
import { cn } from "@/common/lib/utils.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import TheatreScreenDetailsDrawer
    from "@/pages/screens/components/theatre-screens/admin/lists/TheatreScreenDetailsDrawer.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import { ScreenDetails } from "@/pages/screens/schema/screen/Screen.types.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Props for `TheatreDetailsScreensTabContent`.
 */
type TabContentProps = {
    /** ID of the theatre to which the screens belong */
    theatreID: ObjectId;

    /** Array of screen details to display */
    screens: ScreenDetails[];

    /** Total number of screens (for pagination) */
    totalItems: number;

    /** Pagination configuration */
    paginationOptions: {
        /** Current page number */
        page: number;
        /** Number of items per page */
        perPage: number;
        /** Callback to update page number */
        setPage: (val: number) => void;
    };

    /** Optional CSS class overrides */
    classNames?: {
        /** Class applied to the container element */
        container?: string;
        /** Class applied to the screen list element */
        list?: string;
    };
}

const panelInfo = {
    title: "Add Screen",
    description: "Add screen data for theatre.",
};

/**
 * Component rendering the "Screens" tab content for a theatre.
 *
 * @param props - Tab content props including theatre ID, screens, pagination, and styling
 * @returns JSX element rendering the screens list, empty state, form panel, and pagination
 */
const TheatreDetailsScreensTabContent: FC<TabContentProps> = (props) => {
    // ⚡ Props ⚡
    const { totalItems, screens, theatreID, classNames, paginationOptions } = props;
    const { page, perPage, setPage } = paginationOptions;

    // ⚡ Has Screens ⚡
    const hasScreens = isArray(screens) && screens.length > 0;

    // ⚡ Form Panel ⚡
    const presetValues = { theatre: theatreID };
    const disableFields: (keyof ScreenFormValues)[] = ["theatre"];

    const formPanel = (
        <ScreenSubmitFormPanel
            presetValues={presetValues}
            disableFields={disableFields}
            {...panelInfo}
        >
            <Button size="sm" variant="link" className={HoverLinkCSS}>
                <Plus /> Add Screens
            </Button>
        </ScreenSubmitFormPanel>
    );

    // ⚡ Has No Screens ⚡
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

    // ⚡ Has Screens ⚡
    return (
        <div className={cn("space-y-5", classNames?.container)}>
            <section className="flex justify-between items-center">
                <PrimaryHeaderText>Screens</PrimaryHeaderText>
                {formPanel}
            </section>

            <section className={cn("grid grid-cols-1 gap-3", classNames?.list)}>
                <SectionHeader srOnly={true}>Screen list</SectionHeader>
                {screens.map((screen) => <TheatreScreenDetailsDrawer key={screen._id} screen={screen} />)}
            </section>

            {
                totalItems > perPage &&
                <PaginationRangeButtons page={page} perPage={perPage} setPage={setPage} totalItems={totalItems} />
            }
        </div>
    );
};

export default TheatreDetailsScreensTabContent;
