import {RouteObject} from "react-router-dom";
import HomeRoutes from "@/domains/client/routing/ClientRoutes.tsx";
import {AuthRoutes} from "@/domains/auth/routing/AuthRoutes.tsx";
import {PersonRoutes} from "@/domains/persons/_routes/PersonRoutes.tsx";
import SystemRoutes from "@/common/routing/SystemRoutes.tsx";
import {UserProfileRoutes} from "@/domains/users";
import {RoleTypeRoutes} from "@/domains/roletypes";
import AdminDashboardRoutes from "@/domains/dashboard/routing/AdminDashboardRoutes.tsx";
import {AdminReservationRoutes} from "@/domains/reservations/_feat/fetch-reservation-by-code";
import {AdminCustomerRoutes} from "@/domains/customers";
import {TheatreRoutes} from "@/domains/theatres";
import {AdminMovieRoutes, BrowseMovieRoutes} from "@/domains/movies";
import {AdminGenreRoutes, ClientGenreRoutes} from "@/domains/genres";
import {BrowseShowingRoutes, ShowingRoutes} from "@/domains/showings";
import {BrowsePersonRoutes} from "@/domains/persons";

// --- ADMIN ROUTES ---

const adminRoutes = [
    ...AdminDashboardRoutes,

    ...AdminGenreRoutes,
    ...PersonRoutes,
    ...RoleTypeRoutes,
    ...AdminMovieRoutes,
    ...AdminCustomerRoutes,

    ...ShowingRoutes,
    ...AdminReservationRoutes,
];

// --- CLIENT ROUTES ---

const clientRoutes: RouteObject[] = [
    ...UserProfileRoutes,
    ...ClientGenreRoutes,
    ...BrowseMovieRoutes,
    ...BrowseShowingRoutes,
    ...BrowsePersonRoutes,
];

// --- AGGREGATE ---

export default [
    ...SystemRoutes,

    ...HomeRoutes,
    ...AuthRoutes,

    ...adminRoutes,
    ...clientRoutes,

    ...TheatreRoutes
];

