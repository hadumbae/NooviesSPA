import {TheatreDetailsSearchParams} from "@/pages/theatres/schema/params/TheatreDetailsSearchParamSchema.ts";

/**
 * Default search parameters for the Theatre Details page.
 * These are the possible query parameters and their optional defaults.
 */
export type TheatreDetailsSearchParamsDefaults = {
    /** The currently active tab. Defaults to `"screens"` or `"showings"`. */
    activeTab?: "screens" | "showings";

    /** The current page number for the screens list, as a string. */
    screenPage?: string;

    /** Number of screens per page, as a string. */
    screenPerPage?: string;

    /** The current page number for the showings list, as a string. */
    showingPage?: string;

    /** Number of showings per page, as a string. */
    showingPerPage?: string;
};

/**
 * Return type of the hook or function handling Theatre Details search params.
 * Includes the parsed search parameters and setters for each param.
 */
export type TheatreDetailsSearchParamsReturns = {
    /** The current parsed search parameters. */
    searchParams: TheatreDetailsSearchParams;

    /**
     * Updates the active tab.
     * @param value New tab value as a string or number.
     */
    setActiveTab: (value: string | number) => void;

    /**
     * Updates the screen page number.
     * @param value New page value as a string or number.
     */
    setScreenPage: (value: string | number) => void;

    /**
     * Updates the number of screens per page.
     * @param value New per-page value as a string or number.
     */
    setScreenPerPage: (value: string | number) => void;

    /**
     * Updates the showing page number.
     * @param value New page value as a string or number.
     */
    setShowingPage: (value: string | number) => void;

    /**
     * Updates the number of showings per page.
     * @param value New per-page value as a string or number.
     */
    setShowingPerPage: (value: string | number) => void;
};