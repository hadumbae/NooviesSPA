import {FC} from 'react';
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useFetchScreens from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreens.ts";
import {PaginatedScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {isArray} from "lodash";
import {cn} from "@/common/lib/utils.ts";
import EllipsisPaginationButtons from "@/common/components/pagination/EllipsisPaginationButtons.tsx";
import TheatreScreenDetailsDrawer
    from "@/pages/screens/components/theatre-screens/admin/lists/TheatreScreenDetailsDrawer.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import ScreenSubmitFormPanel from "@/pages/screens/components/submit-form/panel/ScreenSubmitFormPanel.tsx";
import {Plus} from "lucide-react";
import {ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {PaginatedScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import {ScreenQueryOptions} from "@/pages/screens/schema/queries/ScreenQueryOptions.types.ts";

/**
 * Props for the `TheatreScreensOverviewTab` component.
 */
export type OverviewTabProps = {
    /** The ID of the theatre whose screens are being displayed */
    theatreID: ObjectId;

    /** Current page number for pagination */
    page: number;

    /** Number of items to display per page */
    perPage: number;

    /** Callback to update the current page number */
    setPage: (val: string | number) => void;

    /** Optional query filters and sorts to apply when fetching screens */
    queries?: ScreenQueryOptions;

    /** Optional CSS class overrides */
    className?: {
        container?: string;
        list?: string;
    };
};

/**
 * Information for the screen submission form panel.
 */
const panelInfo = {
    title: "Add Screen",
    description: "Add screen data for theatre.",
};

/**
 * Component for displaying an overview of screens for a theatre.
 *
 * - Fetches paginated screens for a given theatre ID.
 * - Handles loading and validation via `QueryBoundary` and `ValidatedQueryBoundary`.
 * - Displays a list of screens with `TheatreScreenDetailsDrawer`.
 * - Includes pagination controls and a form panel to add new screens.
 *
 * @param props - Props controlling theatre ID, pagination, queries, and styling
 * @returns JSX element rendering the screens overview tab
 *
 * @example
 * ```tsx
 * <TheatreScreensOverviewTab
 *   theatreID="64f123abc1234567890abcdef"
 *   page={1}
 *   perPage={10}
 *   setPage={setPage}
 * />
 * ```
 */
const TheatreScreensOverviewTab: FC<OverviewTabProps> = (props) => {
    const {theatreID, page, perPage, setPage, className, queries} = props;

    const screenQuery = useFetchScreens({
        theatre: theatreID,
        paginated: true,
        virtuals: true,
        populate: true,
        page,
        perPage,
        ...queries
    });

    return (
        <QueryBoundary query={screenQuery} errorComponent={ErrorMessageDisplay}>
            <ValidatedQueryBoundary
                query={screenQuery}
                schema={PaginatedScreenDetailsSchema}
                message="Invalid data received. Please try again."
                errorComponent={ErrorMessageDisplay}
            >
                {(paginatedScreens: PaginatedScreenDetails) => {
                    const {totalItems, items: screens} = paginatedScreens;
                    const hasScreens = isArray(screens) && screens.length > 0;

                    const presetValues = {theatre: theatreID};
                    const disableFields: (keyof ScreenFormValues)[] = ["theatre"];

                    const formPanel = (
                        <ScreenSubmitFormPanel presetValues={presetValues} disableFields={disableFields} {...panelInfo}>
                            <Button variant="link" size="sm" className="text-neutral-400 hover:text-black">
                                <Plus/> Add Screens
                            </Button>
                        </ScreenSubmitFormPanel>
                    );

                    if (!hasScreens) {
                        return (
                            <div className={cn(
                                "flex flex-col justify-center items-center space-y-8",
                                className?.container
                            )}>
                                <span className="select-none text-neutral-400">No Registered Screens</span>
                                {formPanel}
                            </div>
                        );
                    }

                    return (
                        <div className={cn("space-y-5", className?.container)}>
                            <section className="grid grid-cols-2 gap-2">
                                <h1 className="font-bold">Screens</h1>
                                <div className="text-right"> {formPanel} </div>
                            </section>

                            <section className={cn("grid grid-cols-1 gap-3", className?.list)}>
                                <h1 className="sr-only">Screen list</h1>
                                {screens.map((screen) =>
                                    <TheatreScreenDetailsDrawer
                                        key={screen._id}
                                        screen={screen}
                                    />
                                )}
                            </section>

                            {
                                totalItems > perPage &&
                                <EllipsisPaginationButtons
                                    page={page}
                                    perPage={perPage}
                                    setPage={setPage}
                                    totalItems={totalItems}
                                />
                            }
                        </div>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreScreensOverviewTab;
