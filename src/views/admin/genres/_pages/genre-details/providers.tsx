/**
 * @fileoverview Provider composition component for wrapping the genre details page with necessary UI state contexts.
 */

import {ReactElement, ReactNode} from "react";
import {IsDeletingUIContextProvider, IsEditingUIContextProvider} from "@/common/_ctx/ui";
import {
    DeletingGenreImageUIContextProvider,
    PendingGenreImageDeleteUIContextProvider,
    PendingGenreImageUpdateUIContextProvider,
    UpdatingGenreImageUIContextProvider
} from "@/domains/genres";

/** Props for the GenreDetailsPageProviders component. */
type ProviderProps = {
    children: ReactNode
};

/** Composes UI state providers for editing, deleting, and image management on the genre details page. */
export function GenreDetailsPageProviders(
    {children}: ProviderProps
): ReactElement {
    return (
        <IsEditingUIContextProvider>
            <IsDeletingUIContextProvider>
                <UpdatingGenreImageUIContextProvider>
                    <PendingGenreImageUpdateUIContextProvider>
                        <DeletingGenreImageUIContextProvider>
                            <PendingGenreImageDeleteUIContextProvider>
                                {children}
                            </PendingGenreImageDeleteUIContextProvider>
                        </DeletingGenreImageUIContextProvider>
                    </PendingGenreImageUpdateUIContextProvider>
                </UpdatingGenreImageUIContextProvider>
            </IsDeletingUIContextProvider>
        </IsEditingUIContextProvider>
    );
}