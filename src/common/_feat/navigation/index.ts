import {
    CombinedNavigateParams,
    DeltaNavigateParams,
    LoggingMessageParams,
    ToNavigateParams,
    useLoggedNavigate
} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {clearRedirectPath} from "@/common/_feat/navigation/clearRedirectPath.ts";
import {useCurrentURLPath} from "@/common/_feat/navigation/useCurrentURLPath.ts";
import {usePaginationLocationState} from "@/common/_feat/navigation/usePaginationLocationState.ts";
import {setRedirectPath} from "@/common/_feat/navigation/setRedirectPath.ts";

export {
    useLoggedNavigate,
    clearRedirectPath,
    useCurrentURLPath,
    usePaginationLocationState,
    setRedirectPath,
}

export type {
    LoggingMessageParams,
    ToNavigateParams,
    DeltaNavigateParams,
    CombinedNavigateParams,
}
