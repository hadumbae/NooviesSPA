/**
 * @fileoverview Hook for composing and normalizing derived values for the Screen Details page.
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import {
    ScreenDetailsUIContext,
    ScreenDetailsUIContextValues
} from "@/domains/theatre-screens/contexts/screen-details/ScreenDetailsUIContext.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {
    TheatreScreenDetailsActiveTab
} from "@/domains/theatre-screens/schema/search-params/TheatreScreenDetailsActiveTabEnumSchema.ts";
import {
    TheatreScreenDetailsSearchParams, TheatreScreenDetailsSearchParamSchema
} from "@/domains/theatre-screens/schema/search-params/TheatreScreenDetailsSearchParamSchema.ts";
import {SeatFormData} from "@/domains/seats/_feat/submit-data";

/** Identifiers required to initialize the screen-scoped page state. */
type ValueParams = {
    screenID: ObjectId;
    theatreID: ObjectId;
};

/** Tab state and update handlers synchronized with URL search parameters. */
type TabConfig = {
    activeTab: TheatreScreenDetailsActiveTab | undefined;
    setActiveTab: (tab: TheatreScreenDetailsActiveTab) => void;
};

/** Aggregated page values including tab state, UI context, and form presets. */
type ValueReturns = {
    tabConfig: TabConfig;
    searchParams: TheatreScreenDetailsSearchParams;
    context: ScreenDetailsUIContextValues;
    presetValues: Partial<SeatFormData>;
    disableFields: (keyof SeatFormValues)[];
};

/**
 * Manages URL search parameters, UI context, and seat form initialization for the screen details view.
 */
export default function useScreenDetailsPageValues(
    {screenID, theatreID}: ValueParams
): ValueReturns {
    const {searchParams, setSearchParams} = useParsedSearchParams({
        schema: TheatreScreenDetailsSearchParamSchema
    });

    const {activeTab} = searchParams;
    const setActiveTab = (tab: TheatreScreenDetailsActiveTab) =>
        setSearchParams({...searchParams, activeTab: tab});

    const context = useRequiredContext({context: ScreenDetailsUIContext});

    const presetValues: Partial<SeatFormData> = {
        screen: screenID,
        theatre: theatreID
    };

    const disableFields: (keyof SeatFormValues)[] = ["theatre", "screen"];

    return {
        tabConfig: {activeTab, setActiveTab},
        searchParams,
        context,
        presetValues,
        disableFields
    };
}