import {RouteObject} from "react-router-dom";
import {AuthRoutes} from "@/domains/auth/routing/AuthRoutes.tsx";
import {PersonRoutes} from "@/domains/persons/_routes/PersonRoutes.tsx";
import {SystemRoutes} from "@/common/_routes/SystemRoutes.tsx";
import {AdminUserRoutes, UserProfileRoutes} from "@/domains/users";
import {RoleTypeRoutes} from "@/domains/roletypes";
import {AdminReservationRoutes} from "@/domains/reservations/_feat/fetch-reservation-by-code";
import {AdminCustomerRoutes} from "@/domains/customers";
import {TheatreRoutes} from "@/domains/theatres";
import {AdminMovieRoutes, BrowseMovieRoutes} from "@/domains/movies";
import {AdminGenreRoutes, ClientGenreRoutes} from "@/domains/genres";
import {BrowseShowingRoutes, ShowingRoutes} from "@/domains/showings";
import {BrowsePersonRoutes} from "@/domains/persons";
import {AdminPageRoutes, ClientPageRoutes} from "@/domains/pages/routing";

// --- ADMIN ROUTES ---

const adminRoutes = [
    ...AdminPageRoutes,
    ...AdminGenreRoutes,
    ...PersonRoutes,
    ...RoleTypeRoutes,
    ...AdminMovieRoutes,
    ...AdminCustomerRoutes,
    ...AdminUserRoutes,

    ...ShowingRoutes,
    ...AdminReservationRoutes,
];

// --- CLIENT ROUTES ---

const clientRoutes: RouteObject[] = [
    ...ClientPageRoutes,
    ...UserProfileRoutes,
    ...ClientGenreRoutes,
    ...BrowseMovieRoutes,
    ...BrowseShowingRoutes,
    ...BrowsePersonRoutes,
];

// --- AGGREGATE ---

export const RegisterRoutes = [
    ...SystemRoutes,

    ...AuthRoutes,

    ...adminRoutes,
    ...clientRoutes,

    ...TheatreRoutes
];


