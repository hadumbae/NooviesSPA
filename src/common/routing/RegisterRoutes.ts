import HomeRoutes from "../../pages/home/routing/HomeRoutes.tsx";
import AuthRoutes from "@/pages/auth/routing/AuthRoutes.tsx";
import GenreRoutes from "@/pages/genres/routing/GenreRoutes.tsx";
import PersonRoutes from "@/pages/persons/routing/PersonRoutes.tsx";
import ScreenRoutes from "@/pages/screens/routing/ScreenRoutes.tsx";
import SeatRoutes from "@/pages/seats/routing/SeatRoutes.tsx";
import TheatreRoutes from "@/pages/theatres/routing/TheatreRoutes.tsx";

export default [
    ...HomeRoutes,
    ...AuthRoutes,

    ...GenreRoutes,
    ...PersonRoutes,

    ...ScreenRoutes,
    ...SeatRoutes,
    ...TheatreRoutes,
];