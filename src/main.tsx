import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterRoutes from "./common/routing/RegisterRoutes.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "@/pages/auth/context/AuthProvider.tsx";

const router = createBrowserRouter(RegisterRoutes);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
      </QueryClientProvider>
  </StrictMode>,
)
