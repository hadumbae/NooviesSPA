/**
 * @file Layout content wrapper for rendering routed components and global notifications.
 * @filename BaseLayoutContent.tsx
 */

import {ReactElement} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {Outlet} from "react-router-dom";
import {Bounce, ToastContainer} from "react-toastify";

/**
 * Manages the primary viewport for routed content and the global notification system.
 */
const BaseLayoutContent = (): ReactElement => {
    return (
        <section className={cn(
            "flex-1 font-offside py-5",
            "max-w-screen-2xl max-md:w-full",
            "xl:mx-36",
        )}>
            {/* Contextual window for the currently matched route */}
            <Outlet/>

            {/* Global toast configuration for consistent UI feedback */}
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