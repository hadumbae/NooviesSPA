import {FC} from 'react';
import {Outlet} from "react-router-dom";

const AdminLayout: FC = () => {
    const currentYear = (new Date()).getFullYear();

    return (
        <main className="flex flex-col space-y-1 p-3 min-h-screen">
            <header className="flex justify-between items-center">
                <h1 className="dotgothic16-regular text-3xl">
                    Noovies MRS
                </h1>
            </header>

            <section className="offside-regular px-2 py-5 flex-1">
                <Outlet/>
            </section>

            <footer className="dotgothic16-regular text-center text-neutral-500">
                <span className="text-sm">
                    All Rights Reserved <span className="font-bold">@ {currentYear}</span> | Noovies Ltd.
                </span>
            </footer>
        </main>
    );
};

export default AdminLayout;
