import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterRoutes from "./common/routing/RegisterRoutes.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "@/pages/auth/context/AuthProvider.tsx";
import ReactQueryClient from "@/config/ReactQueryClient.ts";

const router = createBrowserRouter(RegisterRoutes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={ReactQueryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
      </QueryClientProvider>
  </StrictMode>,
)
