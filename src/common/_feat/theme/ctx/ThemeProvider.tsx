/**
 * @fileoverview Context provider for managing and persisting the application color theme.
 */

import {ReactElement, ReactNode, useCallback, useEffect, useState} from 'react';
import {ThemeContext, ThemeContextValues} from "@/common/_feat/theme/ctx/ThemeContext.ts";
import {ThemeVariant} from "@/common/_schemas/enums/ThemeVariantSchema.ts";
import {getLocalStorageThemeVariant, setLocalStorageThemeVariant} from "@/common/_feat/theme/utils";

/** Props for the ThemeProvider component. */
type ProviderProps = {
    children: ReactNode;
}

/**
 * Manages theme state and synchronizes it with local storage and system preferences.
 */
export function ThemeProvider(
    {children}: ProviderProps
): ReactElement {
    const [themeVariant, setThemeVariant] = useState<ThemeVariant>(() => getLocalStorageThemeVariant());

    const applyThemeVariant = useCallback(() => {
        const isDarkSystem = window
            .matchMedia('(prefers-color-scheme: dark)')
            .matches;

        const isDark =
            localStorage.themeVariant === 'dark' ||
            (localStorage.themeVariant === 'system' && isDarkSystem) ||
            (!('themeVariant' in localStorage) && isDarkSystem);

        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const updateThemeVariant = (variant: ThemeVariant) => {
        setThemeVariant(variant);
        setLocalStorageThemeVariant(variant);
        applyThemeVariant();
    };

    useEffect(() => {
        const query = window.matchMedia('(prefers-color-scheme: dark)');
        applyThemeVariant();

        query.addEventListener('change', applyThemeVariant);
        return () => query.removeEventListener('change', applyThemeVariant);
    }, [applyThemeVariant]);

    const contextValues: ThemeContextValues = {
        themeVariant,
        updateThemeVariant,
    };

    return (
        <ThemeContext.Provider value={contextValues}>
            {children}
        </ThemeContext.Provider>
    );
}