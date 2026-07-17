/**
 * @fileoverview Hook for logging and throwing errors when route parameter validation fails.
 */

import {RouteError, RouteErrorConfig} from "@/common/_err/RouteError.ts"
import {buildContext} from "@/common/_feat/logger-builders/buildLoggerContext.ts"
import {Logger} from "@/common/_feat/logger/Logger.ts"
import {useLocation} from "react-router-dom"
import {ZodIssue} from "zod"

/** Configuration for reporting a route parameter validation failure. */
type ThrowConfig<TRaw = unknown> = {
    raw: TRaw
    errors: ZodIssue[]
}

/**
 * Returns a function that logs a RouteError with context and throws it. */
export function useThrowRouteParamError(
    errorConfig: RouteErrorConfig,
): (params: ThrowConfig) => never {
    const {pathname, search, hash} = useLocation()
    const routeError = new RouteError(errorConfig)

    return <TRaw = unknown>({raw, errors}: ThrowConfig<TRaw>): never => {
        const context = buildContext([
            {key: "url", value: `${pathname}${search}${hash}`},
            {key: "raw", value: raw},
            {key: "errors", value: errors},
        ])

        Logger.error({
            type: "ERROR",
            error: routeError,
            msg: "Failed to fetch route params.",
            context,
        })

        throw routeError
    }
}