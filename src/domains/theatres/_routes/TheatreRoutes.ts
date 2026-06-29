import {TheatreClientRoutes} from "@/domains/theatres/_routes/TheatreClientRoutes.tsx";
import {TheatreAdminRoutes} from "@/domains/theatres/_routes/TheatreAdminRoutes.tsx";

const routes = [
    ...TheatreAdminRoutes,
    ...TheatreClientRoutes,
];

export {
    routes as TheatreRoutes
}

