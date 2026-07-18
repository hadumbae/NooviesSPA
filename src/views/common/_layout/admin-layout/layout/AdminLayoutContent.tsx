import {FC} from 'react';
import {cn} from "@/common/_feat";
import {Outlet} from "react-router-dom";
import {Bounce, ToastContainer} from "react-toastify";
import {
    AppErrorBoundary
} from "@/views/common/_feat/error-boundary/app-error-boundary/boundary/AppErrorBoundary.tsx";

/**
 * Admin layout content wrapper.
 *
 * @remarks
 * - Renders routed content via {@link Outlet}
 * - Provides a global {@link ToastContainer}
 * - Applies consistent spacing and max-width constraints
 */
const AdminLayoutContent: FC = () => {
    return (
        <section className={cn(
            "flex-1 font-roboto py-5",
            "max-w-screen-2xl max-md:w-full",
            "md:mx-5 xl:mx-36",
        )}>
            <AppErrorBoundary>
                <Outlet/>
            </AppErrorBoundary>

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

export default AdminLayoutContent;
