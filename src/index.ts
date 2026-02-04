import Elysia from "elysia";
import { api } from "./app";

const app = new Elysia();

app.get("/", () => 
  "Rutenya ada di /api\n\nDokumentasi: https://github.com/Alpharii/otakudesu-scrapper-api"
);

app.use(api);
app.listen(3000);

console.log(`Server berjalan di http://localhost:3000`);
