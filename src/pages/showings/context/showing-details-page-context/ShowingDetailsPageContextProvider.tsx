/**
 * @file ShowingDetailsPageContextProvider.tsx
 * @summary
 * Context provider for the Showing Details page.
 *
 * Wraps page content and supplies {@link ShowingDetailsPageContext}
 * with the active showing data and its associated seat maps.
 */

import { ReactNode } from "react";
import {
    ShowingDetailsPageContext,
    ShowingDetailsPageContextValues,
} from "@/pages/showings/context/showing-details-page-context/ShowingDetailsPageContext.ts";

/**
 * Props for {@link ShowingDetailsPageContextProvider}.
 *
 * Extends {@link ShowingDetailsPageContextValues} and requires
 * `children` to render the provider subtree.
 */
type ProviderProps = ShowingDetailsPageContextValues & {
    /**
     * Child components that will consume the Showing Details page context.
     */
    children: ReactNode;
};

/**
 * Provides {@link ShowingDetailsPageContext} to its descendants.
 *
 * Intended to be mounted at the top level of the Showing Details page,
 * ensuring consistent access to showing metadata and seating details
 * across nested components.
 *
 * @param props Provider props including context values and children
 * @returns JSX element wrapping children with context provider
 *
 * @example
 * ```tsx
 * <ShowingDetailsPageContextProvider
 *   showing={showing}
 *   seating={seatMaps}
 * >
 *   <ShowingDetailsPage />
 * </ShowingDetailsPageContextProvider>
 * ```
 */
const ShowingDetailsPageContextProvider = (props: ProviderProps) => {
    const { children, ...values } = props;

    return (
        <ShowingDetailsPageContext.Provider value={values}>
            {children}
        </ShowingDetailsPageContext.Provider>
    );
};

export default ShowingDetailsPageContextProvider;
