import Elysia from "elysia";
import { api } from "./app.js";

const app = new Elysia()
  .get("/", () => 
  "Rutenya ada di /api\n\nDokumentasi: https://github.com/Alpharii/otakudesu-scrapper-api"
  )
  .use(api)

export default app.fetch;
