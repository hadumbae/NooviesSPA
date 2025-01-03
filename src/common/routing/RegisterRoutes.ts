import HomeRoutes from "../../pages/home/routing/HomeRoutes.tsx";
import AuthRoutes from "@/pages/auth/routing/AuthRoutes.tsx";
import GenreRoutes from "@/pages/genres/routing/GenreRoutes.tsx";

export default [
    ...HomeRoutes,
    ...AuthRoutes,
    ...GenreRoutes,
];