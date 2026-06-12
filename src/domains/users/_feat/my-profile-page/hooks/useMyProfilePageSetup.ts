/**
 * @fileoverview Hook for managing the My Profile page state and URL parameters.
 */

import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {
    MyProfilePageSearchParams,
    MyProfilePageSearchParamsSchema
} from "@/domains/users/_feat/my-profile-page/schema/MyProfilePageSearchParamsSchema.ts";
import {MyProfilePageActiveTab} from "@/domains/users/_feat/my-profile-page/schema/MyProfilePageActiveTabSchema.ts";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";

/** State and control handlers for the My Profile page. */
type ReturnType = {
    isMobile: boolean;
    searchParams: MyProfilePageSearchParams;
    setSearchParams: (values: MyProfilePageSearchParams) => void;
    setters: {
        setActiveTab: (tab: MyProfilePageActiveTab) => void;
        setResPage: (page: number) => void;
        setRvwPage: (page: number) => void;
        setFavPage: (page: number) => void;
    }
};

/**
 * Initializes and controls the URL-driven state for the My Profile page.
 */
export function useMyProfilePageSetup(): ReturnType {
    const isMobile = useIsMobile();

    const {searchParams, setSearchParams} = useParsedSearchParams({schema: MyProfilePageSearchParamsSchema});
    const setActiveTab = (tab: MyProfilePageActiveTab) => setSearchParams({...searchParams, activeTab: tab});
    const setPage = (key: keyof MyProfilePageSearchParams) => {
        return (value: number) => setSearchParams({...searchParams, [key]: value});
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
