/**
 * @file Optimized hook for detecting if the current viewport width meets a specific breakpoint.
 * @filename useIsBreakpoint.ts
 */

import {useEffect, useState} from "react";
import {ScreenBreakpoint} from "@/common/type/ScreenBreakpoint.ts";
import {ScreenBreakpointConstant} from "@/common/constants/ScreenBreakpointConstant.ts";

/**
 * Props for the {@link useIsBreakpoint} hook.
 */
type BreakpointProps = {
    /** The Tailwind-style breakpoint key to target. */
    breakpoint: ScreenBreakpoint;
    /** Optional manual pixel override. If provided, ignores the standard constant value. */
    pixelCount?: number;
};

/**
 * A reactive hook that determines if the window width is greater than or equal to a threshold.
 */
export function useIsBreakpoint({breakpoint, pixelCount}: BreakpointProps) {
    const countLimit = pixelCount ?? ScreenBreakpointConstant[breakpoint];
    const [isBreakpoint, setIsBreakpoint] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${countLimit}px)`);

        const onChange = () => setIsBreakpoint(window.innerWidth >= countLimit);

        mql.addEventListener("change", onChange)

        setIsBreakpoint(mql.matches);

        return () => mql.removeEventListener("change", onChange)
    }, [countLimit]);

    return !!isBreakpoint
}