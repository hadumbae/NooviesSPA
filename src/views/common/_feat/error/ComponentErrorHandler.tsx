/**
 * @fileoverview Error boundary component for handling and displaying route-level errors.
 */

import {ReactElement} from 'react';
import {useRouteError} from "react-router-dom";
import {PageCenter} from "@/views/common/_comp/page";
import {useHttpResponseErrorHandler, useLoggedNavigate} from "@/common/_feat";

/**
 * Renders a fallback UI when a route error occurs and handles HTTP-specific error redirection.
 */
export function ComponentErrorHandler(): ReactElement | null {
    const navigate = useLoggedNavigate();
    const error = useRouteError();

    useHttpResponseErrorHandler(error);

    if (!(error instanceof Error)) {
        navigate({to: "/error", component: ComponentErrorHandler.name});
        return null;
    }

    const {message} = error;

    return (
        <PageCenter className="space-y-5">
            <h1 className="font-dotGothic16 text-[100px]">
                ERROR
            </h1>

            <h2 className="text-neutral-500">
                {message}
            </h2>
        </PageCenter>
    );
}
