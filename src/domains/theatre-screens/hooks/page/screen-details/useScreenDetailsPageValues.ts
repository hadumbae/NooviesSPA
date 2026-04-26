/**
 * @file useScreenDetailsPageValues.ts
 *
 * Composes and normalizes all derived values required by the
 * Screen Details page.
 *
 * Responsibilities:
 * - Parses and manages screen-related search params
 * - Controls active tab state via URL params
 * - Resolves required UI context
 * - Provides preset and locked form values for seat creation
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

import {SeatForm} from "@/domains/seats/schema/form/SeatForm.types.ts";
import {SeatFormValues} from "@/domains/seats/schema/form/SeatFormValuesSchema.ts";

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

/**
 * Required identifiers for initializing screen-scoped state.
 */
type ValueParams = {
    /** Target screen ID */
    screenID: ObjectId;

    /** Parent theatre ID */
    theatreID: ObjectId;
};

/**
 * Active tab state derived from URL search params.
 */
type TabConfig = {
    /** Currently active tab */
    activeTab: TheatreScreenDetailsActiveTab | undefined;

    /** Updates active tab via search params */
    setActiveTab: (tab: TheatreScreenDetailsActiveTab) => void;
};

/**
 * Aggregated values returned by the hook.
 */
type ValueReturns = {
    /** Active tab controller */
    tabConfig: TabConfig;

    /** Parsed and validated search params */
    searchParams: TheatreScreenDetailsSearchParams;

    /** Required screen details UI context */
    context: ScreenDetailsUIContextValues;

    /** Preset form values scoped to screen and theatre */
    presetValues: Partial<SeatForm>;

    /** Seat form fields locked by context */
    disableFields: (keyof SeatFormValues)[];
};

/**
 * Screen Details page value composer.
 *
 * Centralizes URL state, UI context, and form presets
 * to keep page components declarative and lightweight.
 *
 * @param screenID - Current screen identifier
 * @param theatreID - Parent theatre identifier
 * @returns Normalized page values and handlers
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

    const presetValues: Partial<SeatForm> = {
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
