import {FC} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {Outlet} from "react-router-dom";
import {Bounce, ToastContainer} from "react-toastify";

/**
 * @component BaseLayoutContent
 * @description
 * A layout section responsible for rendering routed page content and providing
 * a global toast notification container.
 *
 * This component wraps the current route’s content (via `Outlet` from
 * React Router) and includes a configured `ToastContainer` from React Toastify.
 * It also applies responsive horizontal margins and vertical padding for layout consistency.
 *
 * @example
 * ```tsx
 * <BaseLayoutContent />
 * ```
 *
 * @remarks
 * - Uses `Outlet` to render nested route content defined in your router configuration.
 * - Includes a `ToastContainer` for consistent toast notifications across the app.
 * - Centers content on large screens (`md:mx-20`, `xl:mx-48`) while using full width on smaller screens.
 * - Applies `offside-regular` font and `py-5` vertical spacing.
 *
 * @dependencies
 * - `react-router-dom.Outlet` — Renders nested route content.
 * - `react-toastify.ToastContainer` — Displays toast notifications.
 * - `react-toastify.Bounce` — Provides toast transition animation.
 * - `cn` — Utility for conditional Tailwind class merging.
 *
 * @returns {JSX.Element} A responsive section containing routed content and a toast notification area.
 */
const BaseLayoutContent: FC = () => {
    return (
        <section className={cn(
            "flex-1 offside-regular py-5",
            "max-w-screen-2xl max-md:w-full",
            "md:mx-20 xl:mx-48",
        )}>
            <Outlet/>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </section>
    );
};

export default BaseLayoutContent;
