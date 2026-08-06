/**
 * @fileoverview Custom React Hook providing a function to invalidate user admin view queries upon user moderation actions.
 */

import {useQueryClient} from "@tanstack/react-query";
import {UserAdminViewDataQueryKeys} from "@/domains/users";

/**
 * Returns a function that invalidates all user admin view queries in TanStack Query context.
 */
export function useInvalidateUserQueriesOnModeration() {
    const queryClient = useQueryClient();

    return () => {
        queryClient.invalidateQueries({queryKey: UserAdminViewDataQueryKeys.all, exact: false})
    }
}