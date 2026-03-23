/**
 * @file Manages the application's color scheme state and persistence.
 * @filename ThemeProvider.tsx
 */

import {FC, PropsWithChildren, useCallback, useEffect, useState} from 'react';
import {ThemeContext, ThemeContextValues} from "@/common/context/theme/ThemeContext.ts";
import getLocalStorageThemeVariant from "@/common/context/theme/utility/getLocalStorageThemeVariant.ts";
import {ThemeVariant} from "@/common/schema/enums/ThemeVariantEnumSchema.ts";
import setLocalStorageThemeVariant from "@/common/context/theme/utility/setLocalStorageThemeVariant.ts";

/**
 * Context provider for managing and persisting UI theme variants (light, dark, system).
 */
const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
    /** The current active theme preference. */
    const [themeVariant, setThemeVariant] = useState<ThemeVariant>(() => getLocalStorageThemeVariant());

    /**
     * Updates the theme state, persists it to storage, and re-evaluates the DOM classes.
     * @param variant - The new theme preference to apply.
     */
    const updateThemeVariant = (variant: ThemeVariant) => {
        setThemeVariant(variant);
        setLocalStorageThemeVariant(variant);
        applyThemeVariant();
    };

    /**
     * Evaluates the current state/system preference and applies the corresponding CSS class to the root element.
     */
    const applyThemeVariant = useCallback(() => {
        const isDarkSystem = window
            .matchMedia('(prefers-color-scheme: dark)')
            .matches;

        const isDark =
            localStorage.themeVariant === 'dark' ||
            (localStorage.themeVariant === 'system' && isDarkSystem) ||
            (!('themeVariant' in localStorage) && isDarkSystem);

        document.documentElement.classList.toggle('dark', isDark);
    }, [])

    /**
     * Sets up the listener for system-level theme changes
     */
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
};

export default ThemeProvider;