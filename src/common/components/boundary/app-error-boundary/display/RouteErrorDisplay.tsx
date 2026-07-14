/**
 * @fileoverview Display component for rendering errors encountered during routing.
 */

import {ErrorHandlerDisplayProps} from "@/common/type/ErrorHandlerProps.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {cn} from "@/common/lib/utils.ts";
import {TriangleAlert} from "lucide-react";
import {RouteError} from "@/common/errors/RouteError.ts";

/** Renders a visual representation of a RouteError with a header and description. */
export const RouteErrorDisplay = ({error, className}: ErrorHandlerDisplayProps<RouteError>) => {
    const {message, description, headerText} = error;

    Logger.log({
        type: "ERROR",
        msg: "Route Error.",
        context: buildContext([
            {key: "error", value: error},
            {key: "errorMessage", value: message},
            {key: "errorHeader", value: headerText},
            {key: "errorDescription", value: description},
        ]),
    });

    return (
        <div className={cn("h-full flex flex-col justify-center items-center space-y-4", className)}>
            <TriangleAlert size={30}/>

            <div className="space-y-2 text-center">
                <h2 className="section-title italic">{headerText}</h2>
                <span className="secondary-text text-sm">{message}</span>
            </div>

            {
                description &&
                <p className="secondary-text p-5 border rounded-xl text-justify">
                    {description}
                </p>
            }
        </div>
    );
};