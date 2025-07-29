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
import ScreenSubmitFormPanel from "@/pages/screens/components/submit-form/ScreenSubmitFormPanel.tsx";
import {Plus} from "lucide-react";
import {ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {PaginatedScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";

type OverviewTabProps = {
    /**
     * Optional CSS class name for customizing layout or styling.
     */
    className?: string;

    /**
     * The unique theatre identifier whose screens are being displayed.
     */
    theatreID: ObjectId;

    /**
     * The current pagination page index (1-based).
     */
    page: number;

    /**
     * The number of items (screens) per page.
     */
    perPage: number;

    /**
     * Setter function to update the current page (used by pagination controls).
     *
     * @param val - A numeric page index or string (from input event).
     */
    setPage: (val: string | number) => void;
};

const panelInfo = {
    title: "Add Seat",
    description: "Submit Screen Data",
};

/**
 * `TheatreScreensOverviewTab` renders a paginated list of screens for a specific theatre.
 *
 * - Fetches screens via {@link useFetchScreens} using the provided theatre ID and pagination settings.
 * - Wraps the query in {@link QueryBoundary} and {@link ValidatedQueryBoundary} to handle loading, error, and schema validation.
 * - Displays either:
 *   - An empty state with an "Add Screens" button if no screens exist, or
 *   - A list of {@link TheatreScreenDetailsDrawer} entries with pagination.
 *
 * @component
 *
 * @param {OverviewTabProps} props - Component props.
 * @param {string} [props.className] - Optional class for layout customization.
 * @param {ObjectId} props.theatreID - Theatre ID to query screens for.
 * @param {number} props.page - Current pagination page.
 * @param {number} props.perPage - Number of screens to display per page.
 * @param {(val: string | number) => void} props.setPage - Function to update the current page.
 *
 * @example
 * ```tsx
 * <TheatreScreensOverviewTab
 *   theatreID="64f28b..."
 *   page={1}
 *   perPage={10}
 *   setPage={(newPage) => setPage(newPage)}
 * />
 * ```
 */
const TheatreScreensOverviewTab: FC<OverviewTabProps> = ({className, theatreID, page, perPage, setPage}) => {
    const screenQuery = useFetchScreens({
        theatre: theatreID,
        paginated: true,
        virtuals: true,
        populate: true,
        page,
        perPage,
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
                        <ScreenSubmitFormPanel
                            presetValues={presetValues}
                            disableFields={disableFields}
                            {...panelInfo}
                        >
                            <Button variant="link" size="sm" className="text-neutral-400 hover:text-black">
                                <Plus/> Add Screens
                            </Button>
                        </ScreenSubmitFormPanel>
                    );

                    if (!hasScreens) {
                        return (
                            <div className="flex flex-col justify-center items-center space-y-8">
                                <span className="select-none text-neutral-400">There Are No Seats</span>
                                {formPanel}
                            </div>
                        );
                    }

                    return (
                        <div className="space-y-5">
                            <section className="grid grid-cols-2 gap-2">
                                <h1 className="font-bold">Screens</h1>
                                <div className="text-right"> {formPanel} </div>
                            </section>

                            <section className={cn("grid grid-cols-1 gap-3", className)}>
                                <h1 className="sr-only">Screen list</h1>
                                {screens.map((screen) =>
                                    <TheatreScreenDetailsDrawer
                                        key={screen._id}
                                        screen={screen}
                                    />
                                )}
                            </section>

                            <EllipsisPaginationButtons
                                page={page}
                                perPage={perPage}
                                setPage={setPage}
                                totalItems={totalItems}
                            />
                        </div>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreScreensOverviewTab;
