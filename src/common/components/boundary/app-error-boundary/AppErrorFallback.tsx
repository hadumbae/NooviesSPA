/**
 * @fileoverview Error fallback component that dispatches errors to specific display handlers based on error type.
 */

import {FallbackProps} from "react-error-boundary";
import {AppErrorDisplay} from "@/common/components/boundary/app-error-boundary/display/AppErrorDisplay.tsx";
import QueryErrorHandler from "@/common/components/boundary/query-error-fallback/QueryErrorHandler.tsx";
import {RouteError} from "@/common/errors/RouteError.ts";
import {RouteErrorDisplay} from "@/common/components/boundary/app-error-boundary/display/RouteErrorDisplay.tsx";
import {NetworkError} from "@/common/errors/NetworkError.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ReactElement} from "react";

/** Props for the AppErrorFallback component. */
type HandlerProps = FallbackProps & { className?: string };

/**
 * Determines the appropriate error UI to render based on whether the error is a network, route, or generic application error.
 */
export function AppErrorFallback(
    {error, className}: HandlerProps
): ReactElement {
    if (error instanceof NetworkError || error instanceof HttpResponseError) {
        return (
            <QueryErrorHandler error={error} className={className}/>
        );
    }

    if (error instanceof RouteError) {
        return (
            <RouteErrorDisplay error={error} className={className}/>
        );
    }

    return (
        <AppErrorDisplay error={error} className={className}/>
    );
}
