import {FC} from 'react';
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchScreens from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreens.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {PaginatedScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import {isArray} from "lodash";
import {cn} from "@/common/lib/utils.ts";
import EllipsisPaginationButtons from "@/common/components/pagination/EllipsisPaginationButtons.tsx";
import TheatreScreenDetailsDrawer
    from "@/pages/screens/components/theatre-screens/admin/lists/TheatreScreenDetailsDrawer.tsx";

type OverviewTabProps = {
    className?: string;
    theatreID: ObjectId;
    page: number;
    perPage: number;
    setPage: (val: string | number) => void;
}

const TheatreScreensOverviewTab: FC<OverviewTabProps> = ({className, theatreID, page, perPage, setPage}) => {
    const {data, isPending, isError, error: queryError} = useFetchScreens({
        theatre: theatreID,
        paginated: true,
        virtuals: true,
        populate: true,
        page,
        perPage,
    });

    const {data: paginatedScreens, success, error: parseError} = useValidateData({
        data,
        isPending,
        schema: PaginatedScreenDetailsSchema,
        message: "Invalid data received. Please try again."
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <ErrorMessageDisplay error={queryError}/>;
    if (!success) return <ErrorMessageDisplay error={parseError}/>;

    const {totalItems, items: screens} = paginatedScreens;
    const hasScreens = isArray(screens) && screens.length > 0;

    if (!hasScreens) {
        return <div className="flex justify-center items-center text-neutral-400">
            <span className="select-none">There Are No Seats</span>
        </div>
    }

    return (
        <div className="space-y-5">
            <section className={cn("grid grid-cols-1 gap-3", className)}>
                <h1 className="sr-only">Screen list</h1>
                {screens.map((screen) => <TheatreScreenDetailsDrawer
                    key={`screen-overview-tab-${screen._id}`}
                    screen={screen}
                />)}
            </section>

            <EllipsisPaginationButtons
                page={page}
                perPage={perPage}
                setPage={setPage}
                totalItems={totalItems}
            />
        </div>
    );
};

export default TheatreScreensOverviewTab;
