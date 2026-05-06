/**
 * @fileoverview Custom hook for managing and updating the admin document title dynamically with an administrative prefix.
 */

import {Dispatch, SetStateAction, useEffect, useState} from "react";

/** Props configuration for the useSetAdminPageTitle hook. */
type HookConfig = {
    presetTitle: string;
};

/** Return value structure for the useSetAdminPageTitle hook. */
type HookReturn = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
};

/** Manages and updates the HTML document title with a dynamic admin prefix when the state changes. */
export function useSetAdminPageTitle({presetTitle}: HookConfig): HookReturn {
    const [title, setTitle] = useState<string>(presetTitle);

    useEffect(() => {
        const docTitle = `Noovies Admin | ${title}`;

        if (title && document.title !== docTitle) {
            document.title = docTitle;
        }
    }, [title]);

    return {
        title,
        setTitle
    };
}