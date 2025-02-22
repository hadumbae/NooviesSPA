import {FC} from 'react';
import {Bounce, ToastContainer} from "react-toastify";
import {SidebarProvider, SidebarTrigger} from "@/common/components/ui/sidebar.tsx";
import AdminSidebar from "@/common/components/sidebar/AdminSidebar.tsx";
import LayoutTitle from "@/common/components/layout/LayoutTitle.tsx";
import LayoutBreakpointIndicator from "@/common/components/layout/LayoutBreakpointIndicator.tsx";
import Cookies from "js-cookie";
import GuestSidebar from "@/common/components/sidebar/GuestSidebar.tsx";
import {Outlet} from "react-router-dom";

const BaseLayout: FC = () => {
    const currentYear = (new Date()).getFullYear();
    const isAuthenticated = Cookies.get("hasAuthToken");

    return (
        <SidebarProvider>
            {
                isAuthenticated
                    ? <AdminSidebar />
                    : <GuestSidebar />
            }

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
