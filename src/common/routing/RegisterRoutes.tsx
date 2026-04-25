import HomeRoutes from "@/domains/client/routing/ClientRoutes.tsx";
import AuthRoutes from "@/domains/auth/routing/AuthRoutes.tsx";
import GenreRoutes from "@/domains/genres/routing/AdminGenreRoutes.tsx";
import PersonRoutes from "@/domains/persons/routing/PersonRoutes.tsx";
import SeatRoutes from "@/domains/seats/routing/SeatRoutes.tsx";
import TheatreRoutes from "@/domains/theatres/routing/TheatreRoutes.tsx";
import ShowingRoutes from "@/domains/showings/routing/ShowingRoutes.tsx";
import AdminMovieRoutes from "@/domains/movies/routing/AdminMovieRoutes.tsx";
import SystemRoutes from "@/common/routing/SystemRoutes.tsx";
import {RouteObject} from "react-router-dom";
import UserProfileRoutes from "@/domains/users/routing/UserProfileRoutes.tsx";
import BrowseMovieRoutes from "@/domains/movies/routing/BrowseMovieRoutes.tsx";
import RoleTypeRoutes from "@/domains/roletype/routing/RoleTypeRoutes.tsx";
import AdminDashboardRoutes from "@/domains/dashboard/routing/AdminDashboardRoutes.tsx";
import ClientGenreRoutes from "@/domains/genres/routing/ClientGenreRoutes.tsx";
import BrowseShowingRoutes from "@/domains/showings/routing/BrowseShowingRoutes.tsx";
import BrowseTheatreRoutes from "@/domains/theatres/routing/BrowseTheatreRoutes.tsx";
import {AdminReservationRoutes} from "@/domains/reservation/views/admin";
import {AdminCustomerRoutes} from "@/domains/customers";

// --- ADMIN ROUTES ---

const adminRoutes = [
    ...AdminDashboardRoutes,

    ...GenreRoutes,
    ...PersonRoutes,
    ...RoleTypeRoutes,
    ...AdminMovieRoutes,
    ...AdminCustomerRoutes,

    ...SeatRoutes,
    ...TheatreRoutes,
    ...ShowingRoutes,
    ...AdminReservationRoutes,
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