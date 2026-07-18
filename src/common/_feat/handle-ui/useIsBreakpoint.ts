import {useEffect, useState} from "react";
import {ScreenBreakpoint} from "@/common/_types/ui/ScreenBreakpoint.ts";
import {ScreenBreakpointConstant} from "@/common/_const/ScreenBreakpointConstant.ts";

type BreakpointProps = {
    breakpoint: ScreenBreakpoint;
    pixelCount?: number;
};

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