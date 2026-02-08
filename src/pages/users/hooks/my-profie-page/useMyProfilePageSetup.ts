/**
 * @file useMyProfilePageSetup.ts
 *
 * Centralized setup hook for the My Profile page.
 *
 * Handles:
 * - Responsive state (mobile vs desktop)
 * - Parsed and validated profile page search parameters
 * - Convenience setters for tab and pagination state
 */

import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {
    MyProfilePageSearchParams,
    MyProfilePageSearchParamsSchema
} from "@/pages/users/schemas/params/MyProfilePageSearchParamsSchema.ts";
import {MyProfilePageActiveTab} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";

type ReturnType = {
    /** Whether the current viewport is considered mobile */
    isMobile: boolean;

    /** Parsed and validated profile page search parameters */
    searchParams: MyProfilePageSearchParams;

    /** Low-level setter for replacing search parameters */
    setSearchParams: (values: MyProfilePageSearchParams) => void;

    setters: {
        /** Updates the active profile page tab */
        setActiveTab: (tab: MyProfilePageActiveTab) => void;

        /** Updates the reservations pagination page */
        setResPage: (page: number) => void;

        /** Updates the reviews pagination page */
        setRvwPage: (page: number) => void;

        /** Updates the favourites pagination page */
        setFavPage: (page: number) => void;
    }
};

/**
 * Provides shared state and helpers required to initialise
 * and control the My Profile page.
 *
 * This hook acts as the single source of truth for URL-driven
 * tab and pagination state.
 */
export function useMyProfilePageSetup(): ReturnType {
    const isMobile = useIsMobile();

    const {searchParams, setSearchParams} = useParsedSearchParams({
        schema: MyProfilePageSearchParamsSchema,
    });

    const setActiveTab = (tab: MyProfilePageActiveTab) =>
        setSearchParams({...searchParams, activeTab: tab});

    const setPage = (key: keyof MyProfilePageSearchParams) => {
        return (value: number) =>
            setSearchParams({...searchParams, [key]: value});
    };

    return {
        isMobile,
        searchParams,
        setSearchParams,
        setters: {
            setActiveTab,
            setResPage: setPage("resPage"),
            setRvwPage: setPage("rvwPage"),
            setFavPage: setPage("favPage"),
        },
    };
}
