import Elysia from "elysia";
import { routes } from "./routes/routes.js";

export const api = new Elysia({
  prefix: "/api",
});

api.use(routes);

// debug route
// api.routes.forEach(r => console.log("[API]", r.path));
