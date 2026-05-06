/**
 * @fileoverview Custom hook for managing and updating the document title dynamically with a prefix.
 */

import {Dispatch, SetStateAction, useEffect, useState} from "react";

/** Props configuration for the useSetPageTitle hook. */
type HookConfig = {
    presetTitle: string;
};

/** Return value structure for the useSetPageTitle hook. */
type HookReturn = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
};

/** Manages and updates the HTML document title with a dynamic prefix when the state changes. */
export function useSetPageTitle({presetTitle}: HookConfig): HookReturn {
    const [title, setTitle] = useState<string>(presetTitle);

    useEffect(() => {
        const docTitle = `Noovies | ${title}`;

        if (title && document.title !== docTitle) {
            document.title = docTitle;
        }
    }, [title]);

    return {
        title,
        setTitle
    };
}