/**
 * @fileoverview Context provider that supplies showing metadata and seating details to the Showing Details page.
 */

import { ReactNode } from "react";
import {
    ShowingDetailsPageContext,
    ShowingDetailsPageContextValues,
} from "@/domains/showings/_ctx/showing-details-page-context/context";

/** Props for the ShowingDetailsPageContextProvider component. */
type ProviderProps = ShowingDetailsPageContextValues & {
    children: ReactNode;
};

/**
 * Provides the ShowingDetailsPageContext to its child component tree.
 */
export const ShowingDetailsPageContextProvider = (props: ProviderProps) => {
    const { children, ...values } = props;

    return (
        <ShowingDetailsPageContext.Provider value={values}>
            {children}
        </ShowingDetailsPageContext.Provider>
    );
};
