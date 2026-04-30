import {TheatreClientRoutes} from "@/domains/theatres/routing/TheatreClientRoutes.tsx";
import {TheatreAdminRoutes} from "@/domains/theatres/routing/TheatreAdminRoutes.tsx";

const routes = [
    ...TheatreAdminRoutes,
    ...TheatreClientRoutes,
];

export {
    routes as TheatreRoutes
}

