/**
 * @fileoverview Hook for extracting and validating route parameters for the user details view.
 */

import {useEffect, useMemo} from "react";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {
    UserDetailsRouteParams,
    UserDetailsRouteParamsSchema
} from "@/domains/users/_feat/admin-view-data/user-details/UserDetailsRouteParamsSchema.ts";

/**
 * Parses and validates user details route parameters, redirecting to the user list on failure.
 */
export function useUserDetailsRouteParams(): UserDetailsRouteParams | null {
    const urlParams = useParams();
    const navigate = useNavigate();

    const parseResults = useMemo(() => UserDetailsRouteParamsSchema.safeParse(urlParams), [urlParams]);

    useEffect(() => {
        if (parseResults.success) return;

        toast.error("Invalid Route Params.");
        navigate("/admin/users");
    }, [parseResults, navigate]);

    return !parseResults.success || !parseResults.data || parseResults.error
        ? null
        : parseResults.data;
}