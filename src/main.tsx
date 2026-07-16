import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RegisterRoutes from "./common/routing/RegisterRoutes.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "@/domains/auth/_feat/manage-auth-user-data/context/AuthProvider.tsx";
import ReactQueryClient from "@/config/ReactQueryClient.ts";
import {ThemeProvider} from "@/common/_feat/theme/ctx/ThemeProvider.tsx";
import {
    IPGeolocationContextProvider
} from "@/common/_feat/external/ipify-country/ctx/IPGeolocationContextProvider.tsx";

const router = createBrowserRouter(RegisterRoutes);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={ReactQueryClient}>
            <AuthProvider>
                <ThemeProvider>
                    <IPGeolocationContextProvider>
                        <RouterProvider router={router}/>
                    </IPGeolocationContextProvider>
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>,
)
