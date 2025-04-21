import {FC} from 'react';
import {Bounce, ToastContainer} from "react-toastify";
import {SidebarProvider, SidebarTrigger} from "@/common/components/ui/sidebar.tsx";
import LayoutTitle from "@/common/components/layout/LayoutTitle.tsx";
import LayoutBreakpointIndicator from "@/common/components/layout/LayoutBreakpointIndicator.tsx";
import {Outlet} from "react-router-dom";
import BaseSidebar from "@/common/components/layout/BaseSidebar.tsx";

const BaseLayout: FC = () => {
    const currentYear = (new Date()).getFullYear();

    return (
        <SidebarProvider>
            <BaseSidebar />

            <main className="flex flex-col space-y-1 p-3 w-full h-screen">
                <header className="flex justify-between items-center">
                    <LayoutTitle text="Noovies MRS" />

                    <div className="flex justify-center space-x-5">
                        <LayoutBreakpointIndicator />
                    </div>

                    <SidebarTrigger />
                </header>

                <section className="flex-1 offside-regular w-full px-2 py-5">
                    <Outlet />

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

                <footer className="dotgothic16-regular text-center text-neutral-500">
                    <span className="text-sm">
                        All Rights Reserved <span className="font-bold">@{currentYear}</span> | Noovies Ltd.
                    </span>
                </footer>
            </main>
        </SidebarProvider>
    );
};

export default BaseLayout;
