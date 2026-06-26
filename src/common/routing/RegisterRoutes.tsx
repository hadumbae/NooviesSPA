import HomeRoutes from "@/domains/client/routing/ClientRoutes.tsx";
import {AuthRoutes} from "@/domains/auth/routing/AuthRoutes.tsx";
import {PersonRoutes} from "@/domains/persons/routing/PersonRoutes.tsx";
import {ShowingRoutes} from "@/domains/showings/routing/ShowingRoutes.tsx";
import SystemRoutes from "@/common/routing/SystemRoutes.tsx";
import {RouteObject} from "react-router-dom";
import {routes as UserProfileRoutes} from "@/domains/users/routing/UserProfileRoutes.tsx";
import {RoleTypeRoutes} from "@/domains/roletype";
import AdminDashboardRoutes from "@/domains/dashboard/routing/AdminDashboardRoutes.tsx";
import {AdminGenreRoutes, ClientGenreRoutes} from "@/domains/genres";
import BrowseShowingRoutes from "@/domains/showings/routing/BrowseShowingRoutes.tsx";
import {AdminReservationRoutes} from "@/domains/reservation/_feat/fetch-reservation-by-code";
import {AdminCustomerRoutes} from "@/domains/customers";
import {TheatreRoutes} from "@/domains/theatres/routing";
import {AdminMovieRoutes, BrowseMovieRoutes} from "@/domains/movies";

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

