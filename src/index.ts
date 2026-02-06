import Elysia from "elysia";
import { api } from "./app";

export default new Elysia()
  .get("/", () => 
  "Rutenya ada di /api\n\nDokumentasi: https://github.com/Alpharii/otakudesu-scrapper-api"
  )
  .use(api)
