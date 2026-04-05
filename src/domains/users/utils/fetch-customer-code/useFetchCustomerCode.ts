/**
 * @file Extraction hook for retrieving and validating the customer uniqueCode from URL parameters.
 * @filename useFetchCustomerCode.ts
 */

import {useLocation, useParams} from "react-router-dom";
import {UserUniqueCode, UserUniqueCodeSchema} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {useEffect} from "react";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {RouteError} from "@/common/errors/RouteError.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";

/**
 * Validates the :uniqueCode param using Zod and logs routing failures.
 * ---
 * @returns The validated {@link UserUniqueCode} or null if validation fails.
 */
export function useFetchCustomerCode(): UserUniqueCode | null {
    const params = useParams();
    const { pathname, search, hash } = useLocation();

    const {success, data: code, error} = UserUniqueCodeSchema.safeParse(params?.uniqueCode);

    useEffect(() => {
        if (!success) {
            const context = buildContext([
                { key: "source", value: useFetchCustomerCode.name },
                { key: "url", value: `${pathname}${search}${hash}` },
                { key: "raw", value: params },
                { key: "errors", value: error.errors },
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
        }
    }, [success, code])

    if (!success || !code) {
        return null;
    }

    return code;
}