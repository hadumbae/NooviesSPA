import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RegisterRoutes from "./common/routing/RegisterRoutes.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "@/pages/auth/context/AuthProvider.tsx";
import ReactQueryClient from "@/config/ReactQueryClient.ts";
import ThemeProvider from "@/common/context/theme/ThemeProvider.tsx";

const router = createBrowserRouter(RegisterRoutes);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={ReactQueryClient}>
            <AuthProvider>
                <ThemeProvider>
                    <RouterProvider router={router}/>
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>,
)
