import HomeRoutes from "../../pages/client/routing/ClientRoutes.tsx";
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
import UserProfileRoutes from "@/pages/users/routing/UserProfileRoutes.tsx";
import BrowseMovieRoutes from "@/pages/movies/routing/BrowseMovieRoutes.tsx";
import RoleTypeRoutes from "@/pages/roletype/routing/RoleTypeRoutes.tsx";
import AdminDashboardRoutes from "@/pages/dashboard/routing/AdminDashboardRoutes.tsx";
import ClientGenreRoutes from "@/pages/genres/routing/ClientGenreRoutes.tsx";
import BrowseShowingRoutes from "@/pages/showings/routing/BrowseShowingRoutes.tsx";
import BrowseTheatreRoutes from "@/pages/theatres/routing/BrowseTheatreRoutes.tsx";

// --- ADMIN ROUTES ---

const adminRoutes = [
    ...AdminDashboardRoutes,

    ...GenreRoutes,
    ...PersonRoutes,
    ...RoleTypeRoutes,
    ...AdminMovieRoutes,

    ...ScreenRoutes,
    ...SeatRoutes,
    ...TheatreRoutes,
    ...ShowingRoutes,
];

// --- CLIENT ROUTES ---

const clientRoutes: RouteObject[] = [
    ...UserProfileRoutes,
    ...ClientGenreRoutes,
    ...BrowseMovieRoutes,
    ...BrowseShowingRoutes,
    ...BrowseTheatreRoutes,
];

// --- AGGREGATE ---

export default [
    ...SystemRoutes,

    ...HomeRoutes,
    ...AuthRoutes,

    ...adminRoutes,
    ...clientRoutes,
];