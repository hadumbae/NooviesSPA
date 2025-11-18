import { FC, PropsWithChildren, useState } from 'react';
import { ThemeContext, ThemeContextValues } from "@/common/context/theme/ThemeContext.ts";
import getLocalStorageThemeVariant from "@/common/context/theme/utility/getLocalStorageThemeVariant.ts";
import { ThemeVariant } from "@/common/schema/enums/ThemeVariantEnumSchema.ts";
import setLocalStorageThemeVariant from "@/common/context/theme/utility/setLocalStorageThemeVariant.ts";

/**
 * Provides theme variant state and management to descendant components via React Context.
 *
 * @remarks
 * - Initializes the theme variant from localStorage using `getLocalStorageThemeVariant`.
 * - Exposes `themeVariant` and `updateThemeVariant` through `ThemeContext`.
 * - Updates both local state and localStorage when `updateThemeVariant` is called.
 * - Components wrapped in this provider can safely consume the theme state using
 *   `useContext(ThemeContext)` or a custom hook.
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @component
 */
const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [themeVariant, setThemeVariant] = useState<ThemeVariant>(() => getLocalStorageThemeVariant());

    /**
     * Updates the theme variant in both local state and localStorage.
     *
     * @param variant - The new theme variant to apply (`'light' | 'dark' | 'system'`).
     */
    const updateThemeVariant = (variant: ThemeVariant) => {
        setLocalStorageThemeVariant(variant);
        setThemeVariant(variant);
    };

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
