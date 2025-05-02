import HomeRoutes from "../../pages/home/routing/HomeRoutes.tsx";
import AuthRoutes from "@/pages/auth/routing/AuthRoutes.tsx";
import GenreRoutes from "@/pages/genres/routing/GenreRoutes.tsx";
import PersonRoutes from "@/pages/persons/routing/PersonRoutes.tsx";
import ScreenRoutes from "@/pages/screens/routing/ScreenRoutes.tsx";
import SeatRoutes from "@/pages/seats/routing/SeatRoutes.tsx";
import TheatreRoutes from "@/pages/theatres/routing/TheatreRoutes.tsx";
import ShowingRoutes from "@/pages/showings/routing/ShowingRoutes.tsx";
import AdminMovieRoutes from "@/pages/movies/routing/AdminMovieRoutes.tsx";
import SystemRoutes from "@/common/routing/SystemRoutes.tsx";
import {RouteObject} from "react-router-dom";
import UserProfileRoutes from "@/pages/client/user/routing/UserProfileRoutes.tsx";
import ClientMovieRoutes from "@/pages/movies/routing/ClientMovieRoutes.tsx";

const adminRoutes = [
    ...GenreRoutes,
    ...PersonRoutes,
    ...AdminMovieRoutes,

    ...ScreenRoutes,
    ...SeatRoutes,
    ...TheatreRoutes,
    ...ShowingRoutes,
];

const clientRoutes: RouteObject[] = [
    ...UserProfileRoutes,
    ...ClientMovieRoutes,
];

export default [
    ...SystemRoutes,

    ...HomeRoutes,
    ...AuthRoutes,

    ...adminRoutes,
    ...clientRoutes,
];