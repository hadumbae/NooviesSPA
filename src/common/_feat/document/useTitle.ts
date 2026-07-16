/**
 * @fileoverview Hook for managing the browser document title.
 */

import {useEffect} from "react";

/** Updates the document title with a standardized prefix. */
export function useTitle(title?: string | null) {
    useEffect(() => {
        const docTitle = `Noovies | ${title}`;

        if (title && document.title !== docTitle) {
            document.title = docTitle;
        }
    }, [title]);
}