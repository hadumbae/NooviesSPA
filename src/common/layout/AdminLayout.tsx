import {FC} from 'react';
import {Bounce, ToastContainer} from "react-toastify";
import AuthGuard from "@/common/guards/AuthGuard.tsx";

const AdminLayout: FC = () => {
    const currentYear = (new Date()).getFullYear();

    return (
        <main className="flex flex-col space-y-1 p-3 w-full h-screen">
            <header className="flex justify-between items-center">
                <h1 className="dotgothic16-regular text-3xl">
                    Noovies MRS
                </h1>

                <div className="flex justify-center space-x-5">
                    <span>Is XS</span>
                    <span className="max-sm:hidden">Is SM</span>
                    <span className="max-md:hidden">Is MD</span>
                    <span className="max-lg:hidden">Is LG</span>
                    <span className="max-xl:hidden">Is XL</span>
                    <span className="max-2xl:hidden">Is 2XL</span>
                </div>
            </header>

            <section className="flex-1 offside-regular w-full px-2 py-5">
                <AuthGuard />

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
    );
};

export default AdminLayout;
