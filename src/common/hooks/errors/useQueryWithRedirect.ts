import {useQuery} from "@tanstack/react-query";
import handleHTTPResponseError from "@/common/handlers/query/handleHTTPResponseError.ts";
import {useLocation, useNavigate} from "react-router-dom";

interface Params<TData> {
    queryKey: string[];
    queryFn: () => Promise<TData>;
}

export default function useQueryWithRedirect<TData, TError extends Error>({queryKey, queryFn}: Params<TData>) {
    const navigate = useNavigate();

    const {pathname, search, hash} = useLocation();
    const currentURL = new URL(`${window.origin}${pathname}${search}${hash}`);

    const query = useQuery<TData, TError>({queryKey, queryFn});
    const {isError, error} = query;

    if (isError) {
        handleHTTPResponseError({error, navigate, currentURL});
    }

    return query;
}