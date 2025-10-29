import {IDStringSchema, ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Custom React hook to safely retrieve and validate the `roleTypeID` route parameter.
 *
 * This hook:
 * 1. Extracts `roleTypeID` from the URL using `useParams`.
 * 2. Validates it with {@link IDStringSchema}.
 * 3. Redirects to `/admin/roletypes` with a toast error if invalid.
 *
 * @returns The validated `roleTypeID` as an {@link ObjectId} if valid, or `null` otherwise.
 *
 * @example
 * ```ts
 * const roleTypeID = useFetchRoleTypeParams();
 *
 * if (roleTypeID) {
 *   // Safe to fetch or use this ID
 * }
 * ```
 *
 * @remarks
 * - Automatically handles navigation for invalid IDs.
 * - Displays a toast notification to inform the user of the error.
 */
export default function useFetchRoleTypeParams(): ObjectId | null {
    const navigate = useLoggedNavigate();
    const { roleTypeID } = useParams<{ roleTypeID: ObjectId }>();
    const { success, data } = IDStringSchema.safeParse(roleTypeID);

    useEffect(() => {
        if (!success || !data) {
            toast.error("Invalid Role Type ID.");
            navigate({
                level: "warn",
                to: "/admin/roletypes",
                component: useFetchRoleTypeParams.name,
                message: "Failed to fetch ID for role type. ID either does not exist or is invalid.",
            });
        }
    }, [success, data, navigate]);

    if (!success || !data) return null;

    return data;
}
