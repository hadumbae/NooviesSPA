import HomeRoutes from "../../pages/home/routing/HomeRoutes.tsx";
import AuthRoutes from "@/pages/auth/routing/AuthRoutes.tsx";
import GenreRoutes from "@/pages/genres/routing/GenreRoutes.tsx";
import PersonRoutes from "@/pages/persons/routing/PersonRoutes.tsx";
import ScreenRoutes from "@/pages/screens/routing/ScreenRoutes.tsx";
import SeatRoutes from "@/pages/seats/routing/SeatRoutes.tsx";
import TheatreRoutes from "@/pages/theatres/routing/TheatreRoutes.tsx";
import ShowingRoutes from "@/pages/showings/routing/ShowingRoutes.tsx";
import MovieRoutes from "@/pages/movies/routing/MovieRoutes.tsx";
import SystemRoutes from "@/common/routing/SystemRoutes.tsx";

export default [
    ...SystemRoutes,

    ...HomeRoutes,
    ...AuthRoutes,

    ...GenreRoutes,
    ...PersonRoutes,
    ...MovieRoutes,

    ...ScreenRoutes,
    ...SeatRoutes,
    ...TheatreRoutes,
    ...ShowingRoutes,
];