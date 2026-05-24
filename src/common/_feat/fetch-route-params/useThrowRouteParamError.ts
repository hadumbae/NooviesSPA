/**
 * @fileoverview Defines a custom hook for handling and logging route parameter
 * validation failures. It captures the current navigation state and throws
 * a structured RouteError to be caught by higher-level Error Boundaries.
 */

import {RouteError, RouteErrorConfig} from "@/common/errors/RouteError.ts"
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts"
import Logger from "@/common/utility/features/logger/Logger.ts"
import {useLocation} from "react-router-dom"
import {ZodIssue} from "zod"

type ThrowConfig<TRaw = unknown> = {
    raw: TRaw
    errors: ZodIssue[]
}

/**
 * Custom hook that returns a function to log and throw a structured RouteError.
 */
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