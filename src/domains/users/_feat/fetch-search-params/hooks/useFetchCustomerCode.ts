/**
 * @fileoverview Extraction hook for retrieving and validating the customer uniqueCode from URL parameters.
 */

import {useLocation, useParams} from "react-router-dom";
import {UserUniqueCode, UserUniqueCodeSchema} from "@/domains/users/_schema/fields/UserUniqueCodeSchema.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {RouteError} from "@/common/errors/RouteError.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {useMemo} from "react";

/**
 * Validates the uniqueCode route parameter using Zod and logs routing failures.
 */
export function useFetchCustomerCode(): UserUniqueCode {
    const params = useParams();
    const {pathname, search, hash} = useLocation();

    const {success, data: code, error} = useMemo(
        () => UserUniqueCodeSchema.safeParse(params?.uniqueCode),
        [params?.uniqueCode]
    );

    if (!success) {
        const context = buildContext([
            {key: "source", value: useFetchCustomerCode.name},
            {key: "url", value: `${pathname}${search}${hash}`},
            {key: "raw", value: params},
            {key: "errors", value: error.errors},
        ]);

        const routeError = new RouteError({
            headerText: "Invalid Route Params",
            message: "Invalid Params, Unique Code Required",
            description: `Customer [uniqueCode] required. Expected code, received [${params?.uniqueCode}].`
        });

        Logger.error({
            type: "ERROR",
            error: routeError,
            msg: "Failed to fetch customer's unique code.",
            context,
        });

        throw error;
    }

    return code;
}