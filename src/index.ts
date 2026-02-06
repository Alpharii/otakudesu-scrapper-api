import Elysia from "elysia";
import { routes } from "./routes/routes.js";

const api = new Elysia({
  prefix: "/api",
}).use(routes);

const app = new Elysia()
  .get("/", () =>
    "Rutenya ada di /api\n\nDokumentasi: https://github.com/Alpharii/otakudesu-scrapper-api"
  )
  .use(api);

export default app.fetch;
