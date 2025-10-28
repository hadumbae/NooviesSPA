import {FC} from 'react';
import {useRouteError} from "react-router-dom";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import useHttpResponseErrorHandler from "@/common/hooks/errors/useHttpResponseErrorHandler.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * ComponentErrorHandler
 *
 * A React error boundary component that catches routing errors and displays
 * a centralized error page. It delegates HTTP-related errors to the
 * `useHttpResponseErrorHandler` hook for handling (e.g., logging, showing
 * notifications), and renders a simple error message for any other Error
 * types.
 *
 * This component does **not** handle errors thrown by TanStack Query’s
 * `useQuery` or `useMutation` hooks; those should be managed via their
 * built‑in error states or error boundaries wrapping the query/mutation.
 *
 * @remarks
 * - If the caught `error` is not an `Error` instance, it will redirect
 *   to the generic `/error` route.
 * - If it is an `Error`, it displays the error's `message` on a centered
 *   page.
 *
 * @returns A JSX element rendering the error page, or `null` if redirecting.
 *
 * @example
 * ```tsx
 * // In your route definitions:
 * <Route
 *   path="*"
 *   element={<ComponentErrorHandler />}
 *   errorElement={<ComponentErrorHandler />}
 * />
 * ```
 */
const ComponentErrorHandler: FC = () => {
    const navigate = useLoggedNavigate();
    const error = useRouteError();

    // Delegate HTTP errors (status codes, network failures) to the custom hook
    useHttpResponseErrorHandler(error);

    // Non-Error values (e.g. plain objects) get redirected to a catch-all error page
    if (!(error instanceof Error)) {
        navigate({to: "/error", component: ComponentErrorHandler.name});
        return null;
    }

    const {message} = error as Error;

    return (
        <PageCenter className="space-y-5">
            <h1 className="dotgothic16-regular text-[100px]">
                ERROR
            </h1>

            <h2 className="text-neutral-500">
                {message}
            </h2>
        </PageCenter>
    );
};

export default ComponentErrorHandler;
